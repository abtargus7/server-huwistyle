import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique : true,
    },
    description : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        default: 0,
        required: true 
    },
    stock : {
        type: Number,
        default: 0
    },
    productImage : {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Product = mongoose.model("User", productSchema);