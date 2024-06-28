import {asyncHandler} from "../utils/asyncHandler.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadOnCloudinary } from "../utils/cloulinary.js"
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProducts = asyncHandler( async( req, res)=> {
    //access req.body
    //write code for automatically generate product id
    //upload images using multer
    //check if uploaded on multer
    //upload images on cloudinary
    //check if uploaded on cloudinary
    //create product using product model
    //check if product successfully created
    //send res

    const {name, description, newPrice, oldPrice, stock, productImages, SKU, category, available} = req.body;

    console.log(req.files);
    let productImagesCloudnary = [];
    let imageURLs = []
    for(let i = 0; i < req.files.length; i++){
        productImagesCloudnary[i] = await uploadOnCloudinary(req.files?.[i]?.path);
        imageURLs[i] = productImagesCloudnary[i].url;
    }
    console.log(imageURLs);

    const product = new Product({
        name,
        description,
        oldPrice,
        newPrice,
        stock,
        productImages: imageURLs,
        SKU,
        category,
        available
    }) 

    const isCreated = await product.save();

    if(!isCreated){
        throw new ApiError(501, "Something went wrong while adding Product")
    }

    return res.status(201).json(new ApiResponse(200, isCreated, "Product Added Successfully"))
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