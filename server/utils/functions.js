'use strict';
const cloudinary = require('cloudinary').v2;

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