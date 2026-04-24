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

// src/js/api.js dosyasına ekle:
export async function fetchRecipes({
  category = '',
  title = '',
  page = 1,
  limit = 6,
  area = '',
  ingredient = '',
  time = '',
} = {}) {
  const params = new URLSearchParams({
    category,
    title,
    page,
    limit,
    area,
    ingredient,
    time,
  });

  const { data } = await axios.get(`${BASE_URL}/recipes?${params.toString()}`);
  return data;
}
