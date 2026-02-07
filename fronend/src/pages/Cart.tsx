import { useEffect, useState } from "react";
import { Container, List, ListItem, IconButton, Typography, Paper, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ShoppingItem } from "../types";
import { getItems, addItem, deleteItem } from "../api";

export default function Cart({ refreshBadge }: { refreshBadge: () => void }) {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    const refreshCart = async () => {
        const data = await getItems();
        setItems(data);
        refreshBadge(); // Badge immer synchron
    };

    useEffect(() => {
        refreshCart();
    }, []);

    // 🔹 Gruppieren nach Name + Menge berechnen
    const groupedItems = Object.values(
        items.reduce<Record<string, any>>((acc, cur) => {
            if (acc[cur.name]) {
                acc[cur.name].quantity += 1;
            } else {
                acc[cur.name] = { ...cur, quantity: 1 };
            }
            return acc;
        }, {})
    );

    // 🔹 Gesamtsumme
    const total = groupedItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    // 🔹 Menge erhöhen
    const addQuantity = async (item: ShoppingItem) => {
        if (item.price === undefined) return;
        await addItem({ name: item.name, price: item.price });
        refreshCart();
    };

    // 🔹 Menge verringern
    const removeQuantity = async (item: ShoppingItem) => {
        const sameItems = items.filter(i => i.name === item.name);
        if (sameItems.length === 0) return;

        await deleteItem(sameItems[0]._id);
        refreshCart();
    };

    // 🔹 Alle löschen
    const removeAll = async (item: ShoppingItem) => {
        const sameItems = items.filter(i => i.name === item.name);
        for (const i of sameItems) {
            await deleteItem(i._id);
        }
        refreshCart();
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>🛒 Warenkorb</Typography>

                <List>
                    {groupedItems.map(item => (
                        <ListItem key={item.name} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                                <Typography>
                                    {item.price?.toFixed(2)} € × {item.quantity} = {(item.price * item.quantity).toFixed(2)} €
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={() => removeQuantity(item)}>➖</IconButton>
                                <IconButton onClick={() => addQuantity(item)}>➕</IconButton>
                                <IconButton onClick={() => removeAll(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Gesamt: {total.toFixed(2)} €
                </Typography>
            </Paper>
        </Container>
    );
}
