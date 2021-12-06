import axios from "axios";

const BASE_URL = "http://localhost:3030/";

export const getProducts = (params) => {
  return axios
    .get(`${BASE_URL}products`, { params })
    .then((response) => response.data);
};

export const getProduct = (productId) => {
  return axios
    .get(`${BASE_URL}products/${productId}`)
    .then((response) => response.data);
};
