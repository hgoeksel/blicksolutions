import type { ShoppingItem, Product } from "./types";

const BASE_URL = "http://localhost:4000";

// --- Einkaufsliste / Items ---
export const getItems = async (): Promise<ShoppingItem[]> =>
    fetch(`${BASE_URL}/items`).then(res => res.json());

export const addItem = async (item: { name: string; price: number }) => {
    const res = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });

    const text = await res.text(); // 🔥 erst als Text lesen
    console.log("RAW RESPONSE:", text);

    return JSON.parse(text); // erst jetzt JSON parsen
};

export const updateItem = async (id: string, bought: boolean) =>
    fetch(`${BASE_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bought }),
    });

export const deleteItem = async (id: string) =>
    fetch(`${BASE_URL}/items/${id}`, { method: "DELETE" });

// --- Produkte / Product Catalog ---
export const getProducts = async (): Promise<Product[]> =>
    fetch(`${BASE_URL}/products`).then(res => res.json());

// 👉 Jetzt korrekt typisiert
export const addProductToCart = async (
    product: Product
): Promise<ShoppingItem> => {
    if (product.price === undefined) {
        throw new Error("Product has no price");
    }

    return addItem({
        name: product.name,
        price: product.price,
    });
};
