import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    const missing = [
        !process.env.CLOUDINARY_NAME && 'CLOUDINARY_NAME',
        !process.env.CLOUDINARY_API_KEY && 'CLOUDINARY_API_KEY',
        !process.env.CLOUDINARY_SECRET_KEY && 'CLOUDINARY_SECRET_KEY',
    ].filter(Boolean);

    if (missing.length > 0) {
        console.error(`Cloudinary missing env vars: ${missing.join(', ')}`);
        return;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log('Cloudinary connected successfully');
};

export { cloudinary };
export default connectCloudinary;