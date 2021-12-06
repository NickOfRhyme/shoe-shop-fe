import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { navigate } from "@reach/router";

export default function TitleBar() {
  const { user, changeUser } = useContext(UserContext);
  const { cartOpen, changeCartOpen } = useContext(CartContext);

  const handleCart = (e) => {
    e.preventDefault();
    changeCartOpen(!cartOpen);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    changeUser(null);
  };

  return (
    <AppBar>
      <Toolbar>
        {user && user.role !== "admin" && (
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleCart}>
            <ShoppingCart />
          </IconButton>
        )}
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Golden Shoe
        </Typography>
        {user ? (
          <Button color='inherit' onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button color='inherit' onClick={handleLogin}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
