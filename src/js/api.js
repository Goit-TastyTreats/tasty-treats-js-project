import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

export async function fetchEvents() {
  try {
    const { data } = await axios.get(`${BASE_URL}/events`);
    return data;
  } catch (error) {
    console.error('Events çekilirken hata oluştu:', error.message);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data;
  } catch (error) {
    console.error('Kategoriler çekilirken hata oluştu:', error.message);
    return [];
  }
}

export async function fetchPopularRecipes() {
  try {
    const { data } = await axios.get(`${BASE_URL}/recipes/popular`);
    return data;
  } catch (error) {
    console.error('Popüler tarifler çekilirken hata oluştu:', error.message);
    return [];
  }
}

export async function fetchRecipes(options = {}) {
  try {
    const { data } = await axios.get(`${BASE_URL}/recipes`, {
      params: {
        page: options.page || 1,
        limit: options.limit || 9,
        category: options.category || '',
        title: options.title || '',
        area: options.area || '',
        ingredient: options.ingredient || '',
        time: options.time || '',
      },
    });
    return data;
  } catch (error) {
    console.error('Tarifler çekilirken hata:', error.message);
    return { results: [] };
  }
}

export async function fetchRecipeById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/recipes/${id}`);
    return data;
  } catch (error) {
    console.error('Tarif detayları alınamadı:', error.message);
    return null;
  }
}

export async function createOrder(orderData) {
  try {
    console.log('Gönderilen veri:', JSON.stringify(orderData));
    const { data } = await axios.post(`${BASE_URL}/orders/add`, orderData);
    return data;
  } catch (error) {
    console.error('Sipariş gönderilirken hata:', error.message);
    console.error('Hata detayı:', error.response?.data);
    console.error('Gönderilen veri:', JSON.stringify(orderData));
    throw error;
  }
}