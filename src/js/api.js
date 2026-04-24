import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// Kategorileri getirir
export async function fetchCategories() {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
}

// Popüler tarifleri getirir
export async function fetchPopularRecipes() {
  const { data } = await axios.get(`${BASE_URL}/recipes/popular`);
  return data;
}
