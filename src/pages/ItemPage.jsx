import * as api from "../api";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Button,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

export default function ItemPage({ item }) {
  const [product, setProduct] = useState({});

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
        <Typography variant='h4'>
          {product.stock - product.in_carts} available
        </Typography>
      </Stack>

      <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
        <Button variant='contained'>Add to cart</Button>
        <Button variant='outlined'>Edit</Button>
      </Stack>
    </Container>
  );
}
