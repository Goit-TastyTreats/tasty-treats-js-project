import { fetchCategories } from './api.js';

const categoryList = document.querySelector('#category-list');
const allCatBtn = document.querySelector('#all-category-btn');

async function initCategories() {
  try {
    // 1. Veriyi çek
    const categories = await fetchCategories();

    // 2. HTML taslağını (markup) oluştur
    const markup = categories
      .map(
        ({ name }) => `
      <li class="cat-items">
        <button type="button" class="category-btn" data-name="${name}">${name}</button>
      </li>
    `
      )
      .join('');

    // 3. Ekrana bas
    if (categoryList) {
      categoryList.innerHTML = markup;
    }
  } catch (error) {
    console.error('Kategoriler yüklenirken bir hata oluştu:', error);
  }
}

// Tıklama olaylarını dinle (Event Delegation)
if (categoryList) {
  categoryList.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') return;

    // Aktif buton görselini değiştir
    document
      .querySelectorAll('.category-btn, #all-category-btn')
      .forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    console.log('Seçilen Kategori:', e.target.dataset.name);
  });
}

// "All Categories" butonu için sıfırlama
if (allCatBtn) {
  allCatBtn.addEventListener('click', () => {
    document
      .querySelectorAll('.category-btn')
      .forEach(btn => btn.classList.remove('active'));
    allCatBtn.classList.add('active');
  });
}

// Dosya yüklendiğinde çalıştır
initCategories();
