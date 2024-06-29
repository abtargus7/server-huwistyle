import {asyncHandler} from "../utils/asyncHandler.js"
import { removeFromCloudinary, uploadOnCloudinary } from "../utils/cloulinary.js"
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
    const productToBeRemoved = await Product.findOne({id: req.body.id});

    console.log(productToBeRemoved);

    // remove productImages from cloudinary
    let productImageNames = [];
    const {productImages} = productToBeRemoved;
    for(let i = 0; i < productImages.length; i++){
        const productImageURL = productImages[i].split("/");
        const productImage = productImageURL[productImageURL.length -1].split(".");
        const productImageName = productImage[0];

        productImageNames[i] = productImageName;
    }
    
    console.log(productImageNames);
    
    const removedProduct = await Product.findOneAndDelete({id: req.body.id})
    if(!removeProduct) {
        throw new ApiError(501, "Failed to remove product.")
    }

    const removeImages = await removeFromCloudinary(productImageNames);
    if(!removeImages) {
        throw new ApiError(501, "Failed to remove Images");
    }
    console.log(removeImages);
    
    return res.status(201).json(new ApiResponse(200, removedProduct, "Product removed successfully!"))
})

const getProducts = asyncHandler( async( req, res) => {
    const products = await Product.find({});

    if(!products) {
        throw new ApiError(501, "Something went wrong while fetching Products")
    }
    //send response
    return res.status(201).json(new ApiResponse(200, products, "Fetched all products"))
})

export {addProducts, getProducts, removeProduct};