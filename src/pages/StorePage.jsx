import * as api from "../api";
import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

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
    <Container maxWidth='sm'>
      <Typography>Products Available Today</Typography>

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

      <ul>
        {productList.map(
          (product) => (
            <p>{product.product_name}</p>
          )
          // <Link to={`/items/${product.id}`}>Let's take a look at item {product}</Link>
        )}
      </ul>
    </Container>
  );
}

/*
queries:
category_id: men: 1, women: 2, kids: 3
shoetype_id: trainers: 1, boots: 2, kids: 3
size:

product:
category_id INT REFERENCES productcategories(id) NOT NULL,
    shoetype_id INT REFERENCES shoetypes(id) NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    short_desc VARCHAR(250) NOT NULL,
    full_desc TEXT NOT NULL,
    price_pence INT NOT NULL,
    stock INT NOT NULL,
    in_carts INT NOT NULL DEFAULT 0,
    size INT NOT NULL
*/
