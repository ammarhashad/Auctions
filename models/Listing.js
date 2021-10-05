const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  startingBid: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      'Electronics',
      'Home and Kitchen',
      'Computers',
      'Smart Home',
      'Arts & Crafts',
      'Automotive',
      'Software',
      'Video Games',
    ],
    required: true,
  },
  bids: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
      },
      bidder: {
        type: String,
        required: true,
      },
      bid: {
        type: Number,
        required: true,
      },
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Listing = mongoose.model('listing', ListingSchema);
