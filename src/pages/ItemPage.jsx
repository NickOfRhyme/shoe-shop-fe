import * as api from "../api";
import { useEffect, useState, useContext } from "react";
import { Container, Typography, Stack, Button } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

export default function ItemPage({ item }) {
  const [product, setProduct] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    api.getProduct(item).then(({ products }) => {
      setProduct(products[0]);
    });
  }, []);

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

      <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
        <Button variant='contained'>Add to cart</Button>
        {user?.role === "admin" && <Button variant='outlined'>Edit</Button>}
      </Stack>
    </Container>
  );
}
