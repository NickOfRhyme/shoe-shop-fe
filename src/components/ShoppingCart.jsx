import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material/";
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { Box } from "@mui/system";

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

  const { user } = useContext(UserContext);
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
            {cart.map((product) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
                  }>
                  <ListItemText
                    primary={`${product.product_name} £${
                      product.price_pence / 100
                    }`}
                    secondary={`${
                      product.stock
                    } left in stock.  Order in the next ${5} minutes to guarantee yours.`}
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
