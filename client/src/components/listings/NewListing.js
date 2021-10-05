import React, { useState } from 'react';
import { addListing } from '../../actions/listing';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
const NewListing = ({ addListing, history }) => {
  const [formData, setformData] = useState({
    name: '',
    category: '',
    startingBid: '',
    desc: '',
    img: '',
  });
  const categories = [
    'Electronics',
    'Home and Kitchen',
    'Computers',
    'Smart Home',
    'Arts & Crafts',
    'Automotive',
    'Software',
    'Video Games',
  ];
  const { name, desc, category, startingBid, img } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  var fd = new FormData();

  const onSubmit = e => {
    e.preventDefault();
    fd.append('name', name);
    fd.append('desc', desc);
    fd.append('startingBid', startingBid);
    fd.append('category', category);
    fd.append('img', img, img.name);
    addListing(fd, history);
  };

  const uploadFileHandler = e => {
    setformData({ ...formData, img: e.target.files[0] });
  };

  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-lg-6 m-auto card py-4 text-center'>
          <h1 style={{ fontFamily: 'Open Sans, sans-serif' }}>New Listing</h1>
          <form
            onSubmit={e => onSubmit(e)}
            action=''
            className='mb-5'
            encType='multipart/form-data'
          >
            <input
              name='name'
              value={name}
              maxlength='28'
              placeholder='Name'
              className='form-control my-3'
              type='text'
              onChange={e => onChange(e)}
            />
            <textarea
              maxlength='200'
              name='desc'
              value={desc}
              placeholder='Description'
              className='form-control my-3'
              row='3'
              onChange={e => onChange(e)}
            />
            <select
              name='category'
              value={category}
              onChange={e => onChange(e)}
              class='custom-select form-select-lg mb-1'
              aria-label='.form-select-lg example'
            >
              <option selected>Choose A Category...</option>
              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              name='startingBid'
              value={startingBid}
              type='text'
              className='form-control my-3'
              placeholder='starting bid'
              onChange={e => onChange(e)}
            />
            <div className='custom-file'>
              <input
                name='img'
                type='file'
                filename='img'
                className='custom-file-input my-5'
                id='validatedCustomFile'
                onChange={uploadFileHandler}
                required
              />
              <label
                className='text-left custom-file-label'
                for='validatedCustomFile'
              >
                Upload an image
              </label>
            </div>
            <button className='btn btn-primary btn-block'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addListing })(withRouter(NewListing));
