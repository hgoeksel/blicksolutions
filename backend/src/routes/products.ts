import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

router.get("/", async (_, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Abrufen der Produkte" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const product = new Product({ name });
        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Erstellen des Produkts" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Löschen des Produkts" });
    }
});

export default router;
