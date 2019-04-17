import cloudinary from 'cloudinary-core';

export const cl = new cloudinary.Cloudinary({cloud_name: $__WebPackConfig.CLOUDINARY_CLOUD_NAME});