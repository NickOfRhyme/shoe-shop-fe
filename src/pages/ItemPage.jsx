import * as api from "../api";
import { useEffect, useState, useContext } from "react";
import { Container, Typography, Stack, Button } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";

export default function ItemPage({ item }) {
  const [product, setProduct] = useState({});
  const { user } = useContext(UserContext);
  const { cart, changeCart } = useContext(CartContext);

  const inCart =
    cart?.filter((cartProduct) => cartProduct.id === product.id).length > 0;

  useEffect(() => {
    api.getProduct(item).then(({ products }) => {
      setProduct(products[0]);
    });
  }, [cart]);

  const handleCartPlacement = (e) => {
    e.preventDefault();
    api.putProductInCart(product.id).then((data) => {
      console.log(data);
      const timedProduct = {
        ...product,
        cartRemovalTime: data?.cartRemovalTime,
      };
      cart ? changeCart([...cart, timedProduct]) : changeCart([timedProduct]);
    });
  };

  return (
    <Container maxWidth='sm'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom>
        {product.product_name}
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        {product.full_desc}
      </Typography>

      <Stack sx={{ pt: 4 }} direction='row' justifyContent='space-between'>
        <Typography variant='h4'>£{product.price_pence / 100}</Typography>
        {product.stock - product.in_carts > 0 ? (
          <Typography variant='h4'>
            {product.stock - product.in_carts} available
          </Typography>
        ) : (
          <Typography variant='h4'>Out of stock</Typography>
        )}
      </Stack>
      {user && (
        <Stack
          sx={{ pt: 4 }}
          direction='row'
          spacing={2}
          justifyContent='center'>
          <Button
            onClick={handleCartPlacement}
            disabled={inCart || product.stock - product.in_carts === 0}
            variant='contained'>
            {inCart ? "Added to cart" : "Add to cart"}
          </Button>
          {user?.role === "admin" && <Button variant='outlined'>Edit</Button>}
        </Stack>
      )}
    </Container>
  );
}
