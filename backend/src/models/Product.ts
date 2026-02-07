import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bought: { type: Boolean, default: false },
    price: Number,
    createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema, "items");
