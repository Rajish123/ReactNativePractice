import axios from "axios";
import { fetchAllCategory, fetchAllProducts, fetchCategoryProducts } from "../../constants/UrlConstant";

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
  const response = await axios.get(`${fetchCategoryProducts}?type=${selectedCategory}`);
  return response.data;
};

export const FetchProductByID = async (id) => {
  const response = await axios.get(`${fetchAllProducts}/${id}`);
  return response.data;
}