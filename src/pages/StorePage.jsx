import * as api from "../api";
import { navigate } from "@reach/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Box } from "@mui/system";

export default function StorePage() {
  const [productList, setProductList] = useState([]);
  const [productCategory, setProductCategory] = useState(null);
  const [shoeType, setShoeType] = useState(null);

  useEffect(() => {
    const params = {};
    if (productCategory) params.category_id = productCategory;
    if (shoeType) params.shoetype_id = shoeType;
    api.getProducts(params).then(({ products }) => {
      setProductList(products);
    });
  }, [productCategory, shoeType]);

  const handleCategory = (event, newCategory) => {
    setProductCategory(newCategory);
  };

  const handleShoeType = (event, newShoeType) => {
    setShoeType(newShoeType);
  };

  return (
    <Container maxWidth='md'>
      <Stack
        spacing={2}
        alignItems='center'
        justifyItems='center'
        direction={{ xs: "column", md: "row" }}>
        <ToggleButtonGroup
          value={productCategory}
          exclusive
          onChange={handleCategory}>
          <ToggleButton value={1}>Men</ToggleButton>
          <ToggleButton value={2}>Women</ToggleButton>
          <ToggleButton value={3}>Kids</ToggleButton>
          <ToggleButton value={null}>All</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup value={shoeType} exclusive onChange={handleShoeType}>
          <ToggleButton value={1}>Trainers</ToggleButton>
          <ToggleButton value={2}>Boots</ToggleButton>
          <ToggleButton value={3}>Formal</ToggleButton>
          <ToggleButton value={null}>All</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ height: 20 }} />
      <Grid container spacing={4}>
        {productList.map((product) => (
          <Grid item key={product} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea
                onClick={() => {
                  navigate(`/items/${product.id}`);
                }}>
                <CardMedia
                  component='img'
                  image='https://burst.shopifycdn.com/photos/black-hightop-LED-shoes.jpg'
                />
                <CardContent>
                  <Typography gutterBottom variant='h4'>
                    {product.product_name}
                  </Typography>
                  <Typography>{product.short_desc}</Typography>
                  <Typography variant='subtitle1'>
                    £{product.price_pence / 100}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
