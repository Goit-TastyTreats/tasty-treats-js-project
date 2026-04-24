import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

/**
 * Filtrelere göre tarifleri çeker (Kategori, Kelime, Zaman, Bölge, Malzeme).
 * Ödevindeki tüm arama kriterlerini destekler.
 */
export async function fetchRecipes({
  category = '',
  keyword = '',
  page = 1,
  limit = 6,
  time = '',
  area = '',
  ingredient = '',
} = {}) {
  try {
    const params = {
      category,
      title: keyword,
      page,
      limit,
      time,
      area,
      ingredient,
    };

    const response = await axios.get(`${BASE_URL}/recipes`, { params });
    return response.data;
  } catch (error) {
    console.error('Tarifler yüklenirken hata:', error);
    return null;
  }
}

// Tüm Kategorileri Çeker
export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error);
    return [];
  }
}

// Popüler Tarifleri Çeker
export async function fetchPopularRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/popular`);
    return response.data;
  } catch (error) {
    console.error('Popüler tarifler yüklenirken hata:', error);
    return [];
  }
}

// Belirli Bir Tarifin Detayını Çeker (Modal için)
export async function fetchRecipeDetails(id) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Tarif detayları yüklenirken hata:', error);
    return null;
  }
}
