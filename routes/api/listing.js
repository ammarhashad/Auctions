const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const path = require('path');
const auth = require('../../middleware/auth');
const Listing = require('../../models/Listing');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

// Uploading a photo using multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/public/img');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(req, file, cb) {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: checkFileType,
});

// @route GET api/listing
// @desc get all listings
// @acess public

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route POST api/listing
// @desc creating a new listing
// @access private

router.post(
  '/',
  upload.single('img'),
  [
    auth,

    [
      check('name', 'name is required').notEmpty(),
      check('desc', 'description is required').notEmpty(),
      check('startingBid', 'please enter a valid number for the starting Bid')
        .isInt()
        .notEmpty(),
      check('category', 'please choose a category').notEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          errors: [{ msg: 'please upload a valid photo' }],
        });
      } else {
        const newListing = new Listing({
          author: req.user.id,
          name: req.body.name,
          desc: req.body.desc,
          category: req.body.category,
          startingBid: req.body.startingBid,
          img: req.file.filename,
        });
        await newListing.save();
        res.json(newListing);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/listing/:listing_id
// @desc deleting a listing
// @access private

router.get('/:listing_id', async (req, res) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.listing_id });

    res.json(listing);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route PUT api/listing/:listing_id
// @desc closing a bid
// @access private

router.put('/:listing_id/closebid', auth, async (req, res) => {
  try {
    let listing = await Listing.findOne({ _id: req.params.listing_id });
    var active = false;
    if (req.user.id !== listing.author.toString()) {
      res.status(400).json({ msg: 'User not authorized' });
    } else if (listing.bids.length === 0) {
      res.status(400).json({
        errors: [
          { msg: 'you have to get at least one bid before closing a listing' },
        ],
      });
    } else {
      listing = await Listing.findByIdAndUpdate(
        { _id: req.params.listing_id },
        { $set: { active: active } },
        { upsert: true }
      );
      res.json({ msg: 'listing closed ' });
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/listing/:listing_id
// @desc deleting a listing
// @access private

router.delete('/:listing_id/delete', auth, async (req, res) => {
  try {
    let listing = await Listing.findOne({ _id: req.params.listing_id });
    if (req.user.id !== listing.author.toString()) {
      res.status(400).json({ msg: 'User not authorized' });
    } else {
      listing = await Listing.findByIdAndRemove({ _id: req.params.listing_id });
      res.status(200).send('Listing Deleted');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route POST api/listing/:listing_id/bid
// @desc adding a new bid
// @access private

router.post(
  '/:listing_id/bid',
  [auth, check('bid', 'please enter a valid number').isNumeric()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const bidder = await User.findById(req.user.id);
      const listing = await Listing.findById({ _id: req.params.listing_id });
      if (req.user.id === listing.author.toString()) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'You can not bid on your own listing' }] });
      }
      if (listing.bids.length === 0 && req.body.bid <= listing.startingBid) {
        return res.status(400).json({
          errors: [{ msg: 'your bid must be bigger than the starting bid' }],
        });
      }
      if (
        listing.bids.length !== 0 &&
        req.body.bid <= listing.bids[listing.bids.length - 1].bid
      ) {
        return res.status(400).json({
          errors: [{ msg: 'your bid must be bigger than the current bid' }],
        });
      }
      var newBid = {
        user: req.user.id,
        bidder: bidder.name,
        bid: req.body.bid,
      };
      listing.bids.push(newBid);
      await listing.save();
      return res.json(listing);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/listing/comment/:listing_id
// @desc adding a new comment
// @access private

router.post(
  '/:listing_id/comment',
  [auth, check('comment', 'please write a comment first').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const listing = await Listing.findById({ _id: req.params.listing_id });
      const newComment = {
        text: req.body.comment,
        user: req.user.id,
        name: user.name,
      };
      listing.comments.unshift(newComment);
      await listing.save();
      res.json(listing);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/listing/:listing_id/:comment_id
// @desc deleting comment
// @access private

router.delete('/:listing_id/:comment_id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById({ _id: req.params.listing_id });
    // Pull out comment
    const comment = listing.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    listing.comments = listing.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await listing.save();

    return res.json(listing.comments);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route POST api/listing/watchlist/:listing_id
// @desc adding or removing from a user's watchlist
// @route private
router.put('/:listing_id/watchlist', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listing_id);
    const user = await User.findById(req.user.id);
    const AddToWatchList = {
      listing: listing,
    };
    if (
      user.watchList.filter(
        item => item.listing.toString() === req.params.listing_id
      ).length > 0
    ) {
      const removeIndex = await user.watchList
        .map(item => item.listing.toString())
        .indexOf(req.params.listing_id);
      await user.watchList.splice(removeIndex, 1);
      await user.save();
      return res.json(user);
    } else {
      user.watchList.push(AddToWatchList);
      user.save();
      res.json(user);
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/listing/watchlist
// @desc getting a watchlist for a user
// @access private
router.get('/user/watchlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const watchListItems = [];
    user.watchList.forEach(item =>
      watchListItems.push(item.listing.toString())
    );
    const listings = await Listing.find({
      _id: { $in: watchListItems },
    });
    res.json(listings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET api/listing/:category_name
// @desc getting listings by category
// @access public

router.get('/categories/:category_name', async (req, res) => {
  try {
    const listing = await Listing.find({
      category: { $in: req.params.category_name },
    });
    res.json(listing);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
