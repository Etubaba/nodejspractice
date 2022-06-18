const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name:'dyacbdach',
    api_key:process.env.CLOUDINARY_API_Key,
    api_secret:process.env.CLOUDUNARY_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
       folder: 'CloudinaryDemo',
       allowedFormats: ['jpeg', 'png', 'jpg']
       
    }
});








module.exports = {storage};
    
