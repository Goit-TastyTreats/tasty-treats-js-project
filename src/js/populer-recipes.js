import { fetchPopularRecipes } from './api';

// Popüler tariflerin içine dolacağı liste (HTML'deki id'si ile)
const popularList = document.querySelector('#popular-list');

async function renderPopular() {
  const data = await fetchPopularRecipes();

  const markup = data
    .map(({ _id, title, description, preview }) => {
      return `
            <li class="popular-recipe-item" data-id="${_id}">
                <img src="${preview}" alt="${title}" class="popular-recipe-img">
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

renderPopular();
