// src/main.js
import './js/api.js';
import './js/modal-recipe.js';
import './js/all-category.js';
import './js/popular-recipes.js';
import './js/filters.js';

import { fetchPopularRecipes } from './api';

const popularList = document.querySelector('#popular-list');

async function renderPopularRecipes() {
  const recipes = await fetchPopularRecipes();

  if (recipes.length === 0) return;

  const markup = recipes
    .map(({ _id, title, description, preview }) => {
      return `
      <li class="popular-recipe-item" data-id="${_id}">
        <img class="popular-recipe-img" src="${preview}" alt="${title}">
        <div class="popular-recipe-info">
          <h3 class="popular-recipe-title">${title}</h3>
          <p class="popular-recipe-description">${description}</p>
        </div>
      </li>
    `;
    })
    .join('');

  popularList.innerHTML = markup;
}

renderPopularRecipes();
