import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material/";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { Box } from "@mui/system";

const calculateTimeLeft = (date) => {
  const now = +new Date();
  let difference = date - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function ShoppingCart() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ddd",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { cart, changeCart, cartOpen, changeCartOpen } =
    useContext(CartContext);

  const handleClose = () => changeCartOpen(false);
  const handleDelete = (itemId) => {
    const newCart = cart.filter((product) => product.id !== itemId);
    changeCart(newCart.length > 0 ? newCart : null);
  };

  return (
    <Modal open={cartOpen} onClose={handleClose}>
      <Box sx={style}>
        {cart ? (
          <List>
            {cart.map((product, index) => {
              const now = +new Date();
              const timeLeft = +new Date(product.cartRemovalTime);
              const difference = timeLeft - now;
              const minutesLeft = Math.round((difference / 1000 / 60) % 60);

              return (
                <ListItem
                  key={product}
                  secondaryAction={
                    <IconButton onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
                  }>
                  <ListItemText
                    primary={`${product.product_name} £${
                      product.price_pence / 100
                    }`}
                    secondary={`${product.stock} left in stock.  Order in the next ${minutesLeft} minutes to guarantee yours.`}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>Your shopping cart is empty</Typography>
        )}
      </Box>
    </Modal>
  );
}
