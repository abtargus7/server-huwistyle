import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId : {
        type: Number,
        required: true,
        unique: true
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema);