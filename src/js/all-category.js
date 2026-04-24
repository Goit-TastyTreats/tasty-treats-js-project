import { fetchCategories, fetchRecipes } from './api';
import Notiflix from 'notiflix';

const categoryList = document.querySelector('#category-list');
const allCategoriesBtn = document.querySelector('#all-category-btn');

// 1. Sayfa açıldığında kategorileri getir
async function initCategories() {
  try {
    const categories = await fetchCategories();
    renderCategories(categories);
  } catch (error) {
    Notiflix.Notify.failure('Kategoriler yüklenirken bir hata oluştu.');
  }
}

// 2. Kategorileri HTML olarak ekrana bas
function renderCategories(categories) {
  const markup = categories
    .map(
      ({ name }) => `
    <li class="cat-items">
      <button type="button" class="category-btn" data-name="${name}">${name}</button>
    </li>
  `
    )
    .join('');

  categoryList.innerHTML = markup;
}

// 3. Kategoriye tıklandığında çalışacak olan o meşhur fonksiyon
async function onCategoryClick(e) {
  // Sadece butonlara tıklandığında çalış (Event Delegation)
  if (e.target.nodeName !== 'BUTTON') return;

  const categoryName = e.target.dataset.name;

  // Aktiflik sınıfını yönet
  document
    .querySelectorAll('.category-btn, .all-category-button')
    .forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  try {
    // Senin verdiğin o akıllı fetchRecipes çağrısı:
    const data = await fetchRecipes({
      category: categoryName,
      keyword: document.querySelector('#search-input')?.value.trim() || '',
    });

    console.log(`${categoryName} için tarifler:`, data.results);
    // TODO: Burada arkadaşının yazdığı veya senin yazacağın
    // renderRecipesList(data.results) fonksiyonunu çağıracaksın.
  } catch (error) {
    Notiflix.Notify.warning('Tarifler filtrelenirken hata oluştu.');
  }
}

// 4. "All Categories" butonu için özel durum
async function onAllCategoryClick() {
  document
    .querySelectorAll('.category-btn')
    .forEach(btn => btn.classList.remove('active'));
  allCategoriesBtn.classList.add('active');

  const data = await fetchRecipes({
    category: '',
    keyword: document.querySelector('#search-input')?.value.trim() || '',
  });

  console.log('Tüm tarifler getirildi:', data.results);
}

// Dinleyicileri Bağla
categoryList.addEventListener('click', onCategoryClick);
allCategoriesBtn.addEventListener('click', onAllCategoryClick);

// Başlat
initCategories();
