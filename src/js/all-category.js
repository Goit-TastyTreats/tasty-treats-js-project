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
    // Sadece butonlara tıklandığında çalışması için kontrol
    if (e.target.nodeName !== 'BUTTON') return;

    // 1. Önce tüm butonlardan (hem liste içindekiler hem de All Categories) active sınıfını sil
    document
      .querySelectorAll('.category-btn, .all-category-button')
      .forEach(btn => btn.classList.remove('active'));

    // 2. Sadece tıklanan butona active sınıfını ekle
    e.target.classList.add('active');

    // 3. Filtreleme fonksiyonunu çağır
    const categoryName = e.target.dataset.name;
    renderRecipeCards({ category: categoryName });
  }); // Parantez hatası burada düzeltildi: };); yerine });
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
