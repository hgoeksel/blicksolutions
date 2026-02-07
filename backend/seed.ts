const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopping")
    .then(() => console.log("MongoDB verbunden"))
    .catch((err: unknown) => console.error(err));

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageFileName: { type: String, required: true },
    bought: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

const products = [
    { name: "Butter", price: 1.49, description: "Frische Butter aus regionaler Herstellung.", imageFileName: "butter.jpg" },
    { name: "Milch", price: 0.89, description: "Vollmilch 3,5% Fett, 1 Liter.", imageFileName: "milch.jpg" },
    { name: "Brot", price: 2.50, description: "Frisches Bauernbrot aus dem Holzofen.", imageFileName: "brot.jpg" },
    { name: "Käse", price: 3.99, description: "Leckerer Gouda, 48% Fett i.Tr.", imageFileName: "kaese.jpg" },
    { name: "Pizza", price: 5.50, description: "Pizza Margartiha, auf italienischer Art.", imageFileName: "pizza.jpg" },
    { name: "Pasta", price: 5.20, description: "Pasta mit Tomatensauce", imageFileName: "pasta.jpg" },
    { name: "Tomaten", price: 2.99, description: "Frische, rote Tomaten vom Bauern.", imageFileName: "tomaten.jpg" },
    { name: "Gurken", price: 1.79, description: "Knackige Gurken, frisch und saftig.", imageFileName: "gurken.jpg" },
    { name: "Apfelsaft", price: 2.50, description: "100% naturtrüber Apfelsaft, 1L.", imageFileName: "apfelsaft.jpg" },
    { name: "Orangensaft", price: 2.70, description: "Frischer Orangensaft, 1 Liter.", imageFileName: "orangensaft.jpg" },
    { name: "Kaffee", price: 6.50, description: "Gemahlener Kaffee, 500g Packung.", imageFileName: "kaffee.jpg" },
    { name: "Tee", price: 3.80, description: "Schwarzer Tee, 100 Teebeutel.", imageFileName: "tee.jpg" },
    { name: "Wasser", price: 0.99, description: "Mineralwasser still, 0,5L Flasche.", imageFileName: "wasser.jpg" },
    { name: "Croissant", price: 1.20, description: "Frisches Buttercroissant.", imageFileName: "croissant.jpg" },
    { name: "Donuts", price: 1.50, description: "Süße Donuts mit Zuckerguss.", imageFileName: "donuts.jpg" },
    { name: "Schokolade", price: 2.30, description: "Tafel Vollmilchschokolade, 100g.", imageFileName: "schokolade.jpg" },
    { name: "Joghurt", price: 0.99, description: "Naturjoghurt 150g.", imageFileName: "joghurt.jpg" },
    { name: "Müsli", price: 3.50, description: "Knuspriges Müsli, 500g.", imageFileName: "muesli.jpg" },
    { name: "Eier", price: 2.20, description: "Frische Eier, 10 Stück.", imageFileName: "eier.jpg" },
    { name: "Honig", price: 4.10, description: "Blütenhonig aus regionaler Imkerei.", imageFileName: "honig.jpg" }
];

async function seed() {
    await Item.deleteMany({}); // vorher alle löschen

    for (const product of products) {
        await Item.create(product);
        console.log(`${product.name} hinzugefügt`);
    }

    mongoose.disconnect();
}

seed();
