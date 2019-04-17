'use strict';
const cloudinary = require('cloudinary').v2;
const { sms, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config');

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});

function uploadFile (file, options = {}) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, {
      ...options
    }, (error, { version }) => {
      if (error) {
        return reject({ success: false, error })
      }

      resolve({ success: true, version })
    });
  });
};

module.exports = {
  uploadFile,
};