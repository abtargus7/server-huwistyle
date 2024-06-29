import {asyncHandler} from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloulinary.js"
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs"

const addProducts = asyncHandler( async( req, res)=> {

    //access req.body
    const {name, description, newPrice, oldPrice, stock, productImages, SKU, category, available} = req.body;

    //write code for automatically generate product id
    const products = await Product.find({});
    let id;

    if(products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    //upload images on cloudinary
    let productImagesCloudnary = [];
    let imageURLs = []
    for(let i = 0; i < req.files.length; i++){
        productImagesCloudnary[i] = await uploadOnCloudinary(req.files[i]?.path);
        
        //check if uploaded on cloudinary
        if(!productImagesCloudnary[i]) {
            throw new ApiError(401, "Error while uploading images. Make sure you have stable internet connection");
        }
        console.log(productImagesCloudnary[i])
        imageURLs[i] = productImagesCloudnary[i]?.url;
        fs.unlinkSync(req.files[i].path)
    }

    //create product using product model
    const product = new Product({
        id : id,
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

    //check if product successfully created
    if(!isCreated){
        throw new ApiError(501, "Something went wrong while adding Product")
    }

    //send res
    return res.status(201).json(new ApiResponse(200, isCreated, "Product Added Successfully!"))
})


const removeProduct = asyncHandler( async(req, res) => {
    const removedProduct = await Product.findOneAndDelete({id: req.body.id})
    if(!removeProduct) {
        throw new ApiError(501, "Failed to remove product.")
    }
    console.log(removedProduct)
    
    return res.status(201).json(new ApiResponse(200, removedProduct, "Product removed successfully!"))
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

export {addProducts, getProducts, uploadImage, removeProduct};