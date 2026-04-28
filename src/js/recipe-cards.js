import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import svg from '../img/favicon.svg';
import { fetchRecipes, fetchRecipeById } from './api';

const recipesList = document.querySelector('.list-recipes');
const paginationContainer = document.querySelector('.recipes-pagination');

const state = {
  page: 1,
  limit: 9,
  totalPages: 0,
};

const jump = window.innerWidth <= 767 ? 2 : 3;

const setResponsiveLimit = () => {
  const w = window.innerWidth;
  if (w <= 767) state.limit = 6;
  else if (w < 1280) state.limit = 8;
  else state.limit = 9;
};

const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites')) || []; // ilgili fonksiyon import edilip bağlanacak
};

const isFavorite = id => {
  return getFavorites().includes(id); // ilgili fonksiyon import edilip bağlanacak
};

// async function openRecipeModal(id) {    // Deneme amaçlı sanal modal
//   try {
//     const data = await fetchRecipeById(id);
//     if (!data) return;

//     const markup = `
//       <div class="backdrop">
//         <div class="modal">
//           <button class="close-btn">✕</button>
//           <img src="${data.thumb}" alt="${data.title}" />
//           <h2>${data.title}</h2>
//           <p>${data.instructions}</p>
//           <ul>
//             ${data.ingredients.map(i => `<li>${i.name}</li>`).join('')}
//           </ul>
//         </div>
//       </div>
//     `;

//     document.body.insertAdjacentHTML('beforeend', markup);
//     document.body.classList.add('no-scroll');

//     const backdrop = document.querySelector('.backdrop');
//     backdrop.addEventListener('click', closeModal);
//     document.addEventListener('keydown', escClose);
//   } catch {
//     Notiflix.Notify.failure('Modal load failed');
//   }
// }

// function closeModal(e) {
//   if (
//     e.target.classList.contains('backdrop') ||
//     e.target.classList.contains('close-btn')
//   ) {
//     document.querySelector('.backdrop')?.remove();
//     document.body.classList.remove('no-scroll');
//     document.removeEventListener('keydown', escClose);
//   }
// }

// function escClose(e) {
//   if (e.key === 'Escape') {
//     document.querySelector('.backdrop')?.remove();
//     document.body.classList.remove('no-scroll');
//     document.removeEventListener('keydown', escClose);
//   }
// }

const createRatingStars = rating => {
  const rounded = Math.round(rating || 0);

  const filledStar = `
    <svg class="filled-stars" viewBox="0 0 32 32" width="14" height="14">
      <use href="${svg}#icon-star"></use>
    </svg>
  `;

  const emptyStar = `
    <svg class="empty-star" viewBox="0 0 32 32" width="14" height="14">
      <use href="${svg}#icon-star"></use>
    </svg>
  `;

  let stars = '';

  for (let i = 0; i < 5; i++) {
    stars += i < rounded ? filledStar : emptyStar;
  }

  return stars;
};

export const createRecipesList = data => {
  try {
    recipesList.innerHTML = '';

    if (!data?.results) return;

    data.results.forEach(recipe => {
      const markup = `
        <li class="recipes-item" id="${recipe._id}">
          <svg class="favorite-icon ${isFavorite(recipe._id) ? 'favorite-icon-active' : ''}" data-id="${recipe._id}">
            <use href="${svg}#icon-heart"></use>
          </svg>
          <img class="card-img" src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
          <div class="recipe-card">
            <div class="text-content">
              <p class="recipe-card-title">${recipe.title}</p>
              <p class="recipe-card-description">${recipe.description}</p>
            </div>
            <div class="card-btn-container">
              <div class="rating-container">
                <span class="rating-value">${recipe.rating || 0}</span>
                <span class="rating-stars">${createRatingStars(recipe.rating)}</span>
              </div>
              <button type="button" class="see-recipe-btn" name="${recipe._id}" data-modal-recipte-open>See recipe</button>
            </div>
          </div>
        </li>`;
      recipesList.insertAdjacentHTML('beforeend', markup);
    });
  } catch (err) {
    Notiflix.Notify.warning('Opps, something went wrong. Please try again.');
  }
};

export async function reloadRecipesList(options = {}) {
  const newData = await fetchRecipes({
    page: state.page,
    limit: state.limit,
    ...options,
  });

  state.totalPages = newData.totalPages;
  createRecipesList(newData);
  renderPagination();
  return newData;
}

reloadRecipesList();

const changeNumberRecipe = () => {
  const oldLimit = state.limit;
  const oldPage = state.page;

  setResponsiveLimit();

  if (oldLimit === state.limit) return;

  const firstItemIndex = (oldPage - 1) * oldLimit;
  const newPage = Math.floor(firstItemIndex / state.limit) + 1;

  state.page = newPage;

  reloadRecipesList();
};

window.addEventListener('resize', throttle(changeNumberRecipe, 1000));

const renderPagination = () => {
  const pageNumbersEl = paginationContainer.querySelector('.page-numbers');
  pageNumbersEl.innerHTML = '';

  const maxVisible = window.innerWidth <= 767 ? 2 : 3;

  let start = Math.max(1, state.page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > state.totalPages) {
    end = state.totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  if (start > end) return;

  if (start > 1) {
    const prevBlock = document.createElement('button');
    prevBlock.textContent = '...';
    prevBlock.className = 'pageBtn';
    prevBlock.dataset.jump = 'prev';
    pageNumbersEl.appendChild(prevBlock);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.className = 'pageBtn';
    btn.textContent = i;
    btn.dataset.page = i;

    if (i === state.page) btn.classList.add('current-page');

    pageNumbersEl.appendChild(btn);
  }

  if (end < state.totalPages) {
    const nextBlock = document.createElement('button');
    nextBlock.textContent = '...';
    nextBlock.className = 'pageBtn';
    nextBlock.dataset.jump = 'next';
    pageNumbersEl.appendChild(nextBlock);
  }
};

paginationContainer.addEventListener('click', async e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.classList.contains('next-page')) {
    if (state.page < state.totalPages) state.page++;
  } else if (btn.classList.contains('previous-page')) {
    if (state.page > 1) state.page--;
  } else if (btn.classList.contains('first-page')) {
    state.page = 1;
  } else if (btn.classList.contains('last-page')) {
    state.page = state.totalPages;
  } else if (btn.dataset.page) {
    state.page = Number(btn.dataset.page);
  } else if (btn.dataset.jump === 'next') {
    state.page = Math.min(state.page + jump, state.totalPages);
  } else if (btn.dataset.jump === 'prev') {
    state.page = Math.max(state.page - jump, 1);
  } else return;

  await reloadRecipesList();
  renderPagination();
});

recipesList.addEventListener('click', e => {
  const icon = e.target.closest('.favorite-icon');
  if (icon) {
    const id = icon.dataset.id;
    let favorites = getFavorites(); // ilgili fonksiyon import edilip bağlanacak

    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
      icon.classList.remove('favorite-icon-active');
    } else {
      favorites.push(id);
      icon.classList.add('favorite-icon-active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites)); // ilgili fonksiyon import edilip bağlanacak
  }

  const btn = e.target.closest('.see-recipe-btn');
  if (btn) {
    const id = btn.name;
    if (window.openRecipeModal) {
  // Senin modalını açması için API'den veri çekip fonksiyonunu tetikleyelim
  fetch(`https://tasty-treats-backend.p.goit.global/api/recipes/${id}`)
    .then(res => res.json())
    .then(data => window.openRecipeModal(data))
    .catch(err => console.error("Modal açılırken hata:", err));
}
    console.log(id);
  }
});

/* 27/04/2026 - 20:20 - PUSH ÖNCESİ DOSYA İÇERİĞİ

import { fetchRecipes } from './api.js';

const recipeList = document.querySelector('.recipe-list-container'); // HTML'deki orta alanın ID/Class'ı

export async function renderRecipeCards(filters = {}) {
  try {
    const { results } = await fetchRecipes(filters);

    const markup = results
      .map(
        ({ _id, title, preview, description, rating }) => `
  <li class="recipe-card" data-id="${_id}" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('${preview}')">
    <div class="card-content">
      <h3 class="card-title">${title}</h3>
      <p class="card-description">${description}</p>
      <div class="card-footer">
        <div class="rating-wrapper">
          <span class="rating-number">${rating.toFixed(1)}</span>
          </div>
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
 */
