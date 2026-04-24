import { fetchRecipes } from './api.js';

const recipeList = document.querySelector('.recipe-list-container'); // HTML'deki orta alanın ID/Class'ı

export async function renderRecipeCards(filters = {}) {
  try {
    const { results } = await fetchRecipes(filters);

    const markup = results
      .map(
        ({ _id, title, preview, description, rating, tags }) => `
      <li class="recipe-card" data-id="${_id}">
        <div class="card-img-wrapper">
          <img src="${preview}" alt="${title}" class="recipe-card-img">
        </div>
        <div class="card-content">
          <h3 class="card-title">${title}</h3>
          <p class="card-description">${description}</p>
          <div class="card-footer">
            <span class="card-rating">${rating.toFixed(1)}</span>
            <button type="button" class="see-recipe-btn">See recipe</button>
          </div>
        </div>
      </li>
    `
      )
      .join('');

    if (recipeList) recipeList.innerHTML = markup;
  } catch (err) {
    console.error('Tarifler yüklenemedi:', err);
  }
}

// Sayfa ilk açıldığında boş filtreyle çalıştır
renderRecipeCards();
