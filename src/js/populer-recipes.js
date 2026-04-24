import { fetchPopularRecipes } from './api';
import { heardleRecipeById } from './modal-recipe';

const popularList = document.querySelector('.popular-recipes-list');

async function renderPopular() {
  const recipes = await fetchPopularRecipes();

  // Arkadaşının kodundan farklı olarak "map" içinde doğrudan id'yi "data-id" olarak verelim
  const markup = recipes
    .map(
      ({ _id, title, description, preview }) => `
        <li class="popular-item" data-id="${_id}">
            <img class="popular-img" src="${preview}" alt="${title}">
            <div class="popular-content">
                <h3 class="popular-title">${title}</h3>
                <p class="popular-description">${description}</p>
            </div>
        </li>
    `
    )
    .join('');

  popularList.innerHTML = markup;
}

// Modal açma mantığı (Event Delegation)
popularList.addEventListener('click', e => {
  const card = e.target.closest('.popular-item');
  if (card) {
    const recipeId = card.dataset.id;
    heardleRecipeById(recipeId);
  }
});

renderPopular();
