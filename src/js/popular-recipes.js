// src/js/popular-recipes.js
import { fetchPopularRecipes } from './api.js';

const popularList = document.querySelector('.popular-recipes-list'); // HTML'deki class veya ID ile eşleşmeli

async function renderPopularRecipes() {
  try {
    const recipes = await fetchPopularRecipes();
    if (!recipes || recipes.length === 0) return;

    const markup = recipes
      .map(
        ({ _id, title, description, preview }) => `
      <li class="popular-recipe-item" data-id="${_id}">
        <img class="popular-recipe-img" src="${preview}" alt="${title}">
        <div class="popular-recipe-info">
          <h3 class="popular-recipe-title">${title}</h3>
          <p class="popular-recipe-description">${description}</p>
        </div>
      </li>
    `
      )
      .join('');

    if (popularList) {
      popularList.innerHTML = markup;
    }
  } catch (error) {
    console.error('Popüler tarifler basılırken hata oluştu:', error);
  }
}

renderPopularRecipes();
