import { createContext, useContext, useEffect, useState } from "react";
import { getItems } from "../api";
import type { ShoppingItem } from "../types";

type CartContextType = {
    items: ShoppingItem[];
    refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    const refreshCart = async () => {
        const data = await getItems();
        setItems(data);
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider value={{ items, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
