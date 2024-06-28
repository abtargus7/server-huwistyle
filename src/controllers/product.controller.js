import {asyncHandler} from "../utils/asyncHandler.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadOnCloudinary } from "../utils/cloulinary.js"

const addProducts = asyncHandler( async( req, res)=> {
    try{
        return  res.status(200).json({
            message: "Added Product"
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
})

//test code for uploading image
const uploadImage = asyncHandler(async (req, res)=> {
    try{
        console.log(req.file.path)
        if(!req.file.path){
            return null;
        }
        const result = await uploadOnCloudinary(req.file.path);
        console.log(result);

        return res.status(200).json({
            success: true,
            imageUrl: result.url
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
})

const getProducts = asyncHandler( async( req, res) => {
    try{
        return res.status(200).json({
            message: "Get All Products"
        })
    } catch {
        return res.json({
            error: error
        })
    }
})

export {addProducts, getProducts, uploadImage};