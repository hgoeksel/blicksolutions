import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Badge, Container } from "@mui/material";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { getItems } from "./api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export default function App() {
  const [cartCount, setCartCount] = useState(0);

  // 🔥 Badge aktualisieren
  const refreshBadge = async () => {
    const items = await getItems();
    setCartCount(items.length);
  };

  useEffect(() => {
    refreshBadge();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🛒 BlickSolutions Catering
          </Typography>
          <Button color="inherit" component={Link} to="/products">
            Produkte
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/products" element={<Products refreshBadge={refreshBadge} />} />
          <Route path="/cart" element={<Cart refreshBadge={refreshBadge} />} />
          <Route path="*" element={<Products refreshBadge={refreshBadge} />} />
        </Routes>
      </Container>
    </>
  );
}
