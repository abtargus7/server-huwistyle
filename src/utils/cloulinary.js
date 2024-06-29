import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { ApiError } from './ApiError.js';

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        console.log(localFilePath);
        //upload the file on cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // if(!uploadResult){
        //     throw new ApiError(401, "Something went Wrong while uploading image!");
        // }
        console.log("file is uploaded on cloudinary ", uploadResult.url);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload opration got failed
        return null;
    }
}

const removeFromCloudinary = async(arrayOfImageNames) => {
    try{
        if(!arrayOfImageNames) return null;

        const deleteResult = await cloudinary.api.delete_resources(arrayOfImageNames);
        console.log(deleteResult)

        if(!deleteResult) {
            throw new ApiError(501, "Something Went wrong while uploading images")
        }
        console.log("files are removed from cloudinary");
        return deleteResult;

    } catch (error) {
        return error;
    }
}

export {uploadOnCloudinary, removeFromCloudinary};