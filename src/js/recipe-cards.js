import { fetchRecipes } from './api.js';

// Bu değişkeni fonksiyonun dışında ama dosyanın içinde tanımlıyoruz
const recipeList = document.querySelector('.recipe-list-container');

export async function renderRecipeCards(filters = {}) {
  try {
    // api.js'deki fonksiyonu çağırıyoruz
    const data = await fetchRecipes(filters);
    const results = data.results;

    if (!results || results.length === 0) {
      if (recipeList)
        recipeList.innerHTML = '<p>Bu kategoride tarif bulunamadı.</p>';
      return;
    }

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

    if (recipeList) {
      recipeList.innerHTML = markup;
    }
  } catch (err) {
    console.error('Tarifler listelenirken hata:', err);
  }
}

// Sayfa ilk açıldığında tüm tarifleri getir
renderRecipeCards();
