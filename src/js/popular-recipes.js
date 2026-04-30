// src/js/popular-recipes.js
import { fetchPopularRecipes, fetchRecipeById } from './api.js'; // fetchRecipeById ekledik

const popularList = document.querySelector('.popular-recipes-list');

async function renderPopularRecipes() {
  try {
    const recipes = await fetchPopularRecipes();
    if (!recipes || recipes.length === 0) return;

    const markup = recipes
      .map(({ _id, title, description, preview }) => {
        // 1. Önce description var mı diye kontrol et (Komple gitmesini engeller)
        const rawDescription = description || 'No description available';

        // 2. Metni 80 karakterle sınırla (Figma'daki 3 satıra denk gelir)
        const shortDescription =
          rawDescription.length > 80
            ? rawDescription.substring(0, 80) + '...'
            : rawDescription;

        return `
      <li class="popular-recipe-item" data-id="${_id}">
        <img class="popular-recipe-img" src="${preview}" alt="${title}">
        <div class="popular-recipe-info">
          <h3 class="popular-recipe-title">${title}</h3>
          <p class="popular-recipe-description">${shortDescription}</p>
        </div>
      </li>
    `;
      })
      .join('');

    if (popularList) {
      popularList.innerHTML = markup;
    }
  } catch (error) {
    console.error('Popüler tarifler basılırken hata oluştu:', error);
  }
}

renderPopularRecipes();

// Kartlara tıklama olayı
if (popularList) {
  popularList.addEventListener('click', async e => {
    const recipeCard = e.target.closest('.popular-recipe-item');

    if (recipeCard) {
      const recipeId = recipeCard.dataset.id;

      try {
        const recipeDetails = await fetchRecipeById(recipeId);

        // Konsolda "Object" yerine detayları görmek için:
        console.log('Tarif Detayları:', recipeDetails);

        // Modal fonksiyonunu çağırıyoruz
        openRecipeModal(recipeDetails);
      } catch (err) {
        console.error('Tarif detayları getirilemedi:', err);
      }
    }
  });
}
