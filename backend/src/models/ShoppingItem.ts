import { Schema, model } from "mongoose";

export interface ShoppingItem {
    name: string;
    price: number;
    bought: boolean;
    createdAt: Date;
}

const shoppingItemSchema = new Schema<ShoppingItem>({
    name: { type: String, required: true },
    price: { type: Number, required: true }, // 🔥 WICHTIG
    bought: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default model<ShoppingItem>("ShoppingItem", shoppingItemSchema);