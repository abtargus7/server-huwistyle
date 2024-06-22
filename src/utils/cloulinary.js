import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log("file is uploaded on cloudinary ", uploadResult.url);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload opration got failed
        return null;
    }
}

export {uploadOnCloudinary};