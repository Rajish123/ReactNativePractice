import axios from "axios";
import { fetchAllCategory, fetchAllProducts } from "../../constants/UrlConstant";

export const FetchAllProducts = async () => {
  const response = await axios.get(fetchAllProducts);
  return response.data;
};

export const FetchPaginatedProducts = async (limit = 10) => {
  const response = await axios.get(`${fetchAllProducts}?limit=${limit}`);
  return response.data;
};

export const FetchALlCategories = async () => {
  const response = await axios.get(fetchAllCategory);
  return response.data;
};

export const FetchCategoryProducts = async (selectedCategory) => {
  const response = await axios.get(`${fetchAllProducts}/${selectedCategory}`);
  return response.data;
};