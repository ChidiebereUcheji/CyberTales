const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

const dotenv = require("dotenv");
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//  Configure multer storage to use Cloudinary
const storage = multer.memoryStorage(); // Use memory storage to handle multiple files
const upload = multer({ storage: storage });

const uploadImage = (fileBufferOrPath, folder, publicId) => {
  return new Promise((resolve, reject) => {
    const opts = {
      folder: folder,
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'auto',
    };

    // Check if the input is a buffer or a file path
    if (Buffer.isBuffer(fileBufferOrPath)) {
      const stream = cloudinary.uploader.upload_stream(opts, (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      });
      stream.end(fileBufferOrPath);
    } else {
      cloudinary.uploader.upload(fileBufferOrPath, opts, (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      });
    }
  });
};

module.exports = uploadImage;
