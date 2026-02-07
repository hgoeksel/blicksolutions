import { Router } from "express";
import ShoppingItem from "../models/ShoppingItem";

const router = Router();

// --- GET /items ---
router.get("/", async (_, res) => {
    try {
        const items = await ShoppingItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Abrufen der Items" });
    }
});

// --- POST /items ---
router.post("/", async (req, res) => {
    try {
        const { name, price } = req.body;

        // Pflichtfelder prüfen
        if (!name || price === undefined) {
            return res.status(400).json({ error: "Name und Preis benötigt" });
        }

        const item = new ShoppingItem({ name, price });
        await item.save();

        res.status(201).json(item); // 🔥 JSON zurückgeben
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Erstellen des Items" });
    }
});

// --- PUT /items/:id ---
router.put("/:id", async (req, res) => {
    try {
        const item = await ShoppingItem.findByIdAndUpdate(
            req.params.id,
            { bought: req.body.bought },
            { new: true }
        );
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Aktualisieren" });
    }
});

// --- DELETE /items/:id ---
router.delete("/:id", async (req, res) => {
    try {
        await ShoppingItem.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Löschen" });
    }
});

export default router;
