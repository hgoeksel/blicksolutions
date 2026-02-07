import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Product } from "../types";
import { getProducts, addItem } from "../api";

export default function Products({ refreshBadge }: { refreshBadge: () => void }) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const addToCart = async (p: Product) => {
        if (p.price === undefined) return;
        await addItem({ name: p.name, price: p.price });
        refreshBadge();
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>Produkte</Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gap: 2,
                }}
            >
                {products.map((p) => (
                    <Card
                        key={p._id}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: 350, // alle Cards gleiche Höhe
                        }}
                    >
                        {/* Bild */}
                        <Box sx={{ width: "100%", height: 200, overflow: "hidden" }}>
                            <img
                                src={`/images/${p.imageFileName || "default.jpg"}`}
                                alt={p.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Box>

                        {/* Inhalt */}
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>{p.name}</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {p.description || "Keine Beschreibung vorhanden."}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" sx={{ mt: 1, fontWeight: "bold" }}>
                                {p.price ? `${p.price.toFixed(2)} €` : "Preis nicht verfügbar"}
                            </Typography>
                        </CardContent>

                        {/* Button */}
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => addToCart(p)}
                                sx={{ width: "100%" }}
                            >
                                In den Warenkorb
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    );
}
