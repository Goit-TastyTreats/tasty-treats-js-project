// api.js
import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

export async function fetchCategories() {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
}

export async function fetchPopularRecipes() {
  const response = await axios.get(`${BASE_URL}/recipes/popular`);
  return response.data;
}
