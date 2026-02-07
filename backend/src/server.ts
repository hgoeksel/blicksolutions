import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import itemsRoutes from "./routes/items";
import productsRoutes from "./routes/products";

const app = express();

// --- CORS & JSON Middleware ---
app.use(cors()); // Optional: app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// --- MongoDB verbinden ---
mongoose.connect("mongodb://localhost:27017/shopping")
    .then(() => console.log("MongoDB connected"))
    .catch((err: unknown) => console.error(err));

// --- Routen ---
app.use("/items", itemsRoutes);
app.use("/products", productsRoutes);

// --- Server starten ---
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Backend läuft auf http://localhost:${PORT}`);
});
