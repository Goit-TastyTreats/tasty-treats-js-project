import { fetchCategories } from './api.js';
import { renderRecipeCards } from './recipe-cards.js'; // Bu importun olduğundan emin ol

// HATANIN KAYNAĞI BURASI: Bu iki satırın en üstte olduğundan emin olmalısın
const categoryList = document.querySelector('#category-list');
const allCatBtn = document.querySelector('#all-category-btn');

async function initCategories() {
  try {
    const categories = await fetchCategories();
    const markup = categories
      .map(
        ({ name }) => `
      <li class="cat-items">
        <button type="button" class="category-btn" data-name="${name}">${name}</button>
      </li>
    `
      )
      .join('');

    if (categoryList) {
      categoryList.innerHTML = markup;
    }
  } catch (error) {
    console.error('Kategoriler yüklenirken hata oluştu:', error);
  }
}

// Olay dinleyicileri (Event Listeners)
if (categoryList) {
  categoryList.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') return;

    // Aktif buton görselini değiştir
    document
      .querySelectorAll('.category-btn, #all-category-btn')
      .forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filtreleme fonksiyonunu çağır
    const categoryName = e.target.dataset.name;
    renderRecipeCards({ category: categoryName });
  });
}

if (allCatBtn) {
  allCatBtn.addEventListener('click', () => {
    document
      .querySelectorAll('.category-btn')
      .forEach(btn => btn.classList.remove('active'));
    allCatBtn.classList.add('active');
    renderRecipeCards(); // Filtreyi sıfırla
  });
}

initCategories();
