import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'deqpfnzrp',
  api_key: process.env.CLOUDINARY_API_KEY || '922379261263646',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'LAlb1WpKtL_VaKizF6LGG7Yp91k',
});

export default cloudinary;
