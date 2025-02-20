import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'deqpfnzrp',
  api_key: '922379261263646',
  api_secret: 'LAlb1WpKtL_VaKizF6LGG7Yp91k',
});

export default cloudinary;
