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
    newPrice : {
        type: Number,
        default: 0,
        required: true 
    },
    oldPrice : {
        type: Number,
        default: 0,
        required: true
    },
    stock : {
        type: Number,
        default: 0
    },
    productImages : {
        type: [String],
    },
    SKU: {
        type: String,
        unique: true
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: true
    // },
    available: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export const Product = mongoose.model("Product", productSchema);