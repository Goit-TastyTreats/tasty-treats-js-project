const modal = document.querySelector('.js-recipe-modal-backdrop');

export function renderRecipe(recipeData) {
  if (!recipeData) return; // Veri yoksa çalışma

  const { title, instructions, youtube, rating, time, ingredients } = recipeData;

  // Elemanları doldur
  document.querySelector('.recipe-title').textContent = title;
  document.querySelector('.js-instructions').textContent = instructions;
  document.querySelector('.recipe-rating').textContent = `${rating} ★`;
  document.querySelector('.recipe-time').textContent = `${time} min`;
  
  // Video
  const videoId = youtube.includes('v=') ? youtube.split('v=')[1] : '';
  const player = document.getElementById('youtubePlayer');
  if (videoId) {
    player.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
  }

  // Malzemeler
  const ingredientsHtml = ingredients.map(ing => `
    <li class="ingredient-item">
      <span>Malzeme ID: ${ing.id}</span> <span>${ing.measure}</span>
    </li>
  `).join('');
  
  document.querySelector('.js-ingredients').innerHTML = ingredientsHtml;
}

// --- TEST BÖLÜMÜ (Bunu kontrol ettikten sonra silebilirsin) ---
const testVerisi = {
  title: "Battenberg Cake",
  instructions: "Fırını 180 dereceye ısıtın...",
  youtube: "https://www.youtube.com/watch?v=aB41Q7kDZQ0",
  rating: 3.71,
  time: "60",
  ingredients: [{id: "1", measure: "175g"}]
};

// Sayfa yüklenince modalı zorla aç
renderRecipe(testVerisi);
modal.classList.remove('is-hidden');

// Sayfa yüklenir yüklenmez modalı görsellere bakmaksızın açar
window.addEventListener('DOMContentLoaded', () => {
  renderRecipe(testVerisi); // Yukarıda oluşturduğumuz manuel veri
  document.querySelector('.js-recipe-modal-backdrop').classList.remove('is-hidden');
});