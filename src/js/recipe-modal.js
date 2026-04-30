// 1. ELEMENTLERİ SEÇELİM
const modalBackdrop = document.querySelector('.js-recipe-modal-backdrop');
const closeBtn = document.querySelector('.js-modal-close-btn');
const videoWrapperEl = document.querySelector('.video-wrapper');

// 2. KÜRESEL AÇMA FONKSİYONU (Dışarıdan çağrılabilir)
window.openRecipeModal = function(recipeData) {
  if (!recipeData) return;
  renderModalContent(recipeData);
  if (modalBackdrop) {
    modalBackdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  }
};


// renderModalContent fonksiyonunun içine veya sonuna ekle
function setupFavoriteBtn(data) {
  const favBtn = document.querySelector('.js-add-fav-btn');
  if (!favBtn) return;

  // LocalStorage'dan mevcut favorileri al (yoksa boş dizi)
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Eğer bu tarif zaten favorilerdeyse buton metnini "Remove" yap
  const isFav = favorites.some(item => item._id === data._id);
  favBtn.textContent = isFav ? 'Remove from Favorites' : 'Add to Favorites';

  favBtn.onclick = () => {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(item => item._id === data._id);

    if (index === -1) {
      // Favorilerde yoksa ekle
      favorites.push(data);
      favBtn.textContent = 'Remove from Favorites';
    } else {
      // Varsa çıkar
      favorites.splice(index, 1);
      favBtn.textContent = 'Add to Favorites';
    }

    // Güncel listeyi kaydet
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
}

// 3. İÇERİĞİ HTML'E BASAN FONKSİYON
function renderModalContent(data) {
  const titleEl = document.querySelector('.js-recipe-title');
  const instructionsEl = document.querySelector('.js-instructions');
  const ratingEl = document.querySelector('.js-recipe-rating');
  const timeEl = document.querySelector('.js-recipe-time');
  const ingredientsListEl = document.querySelector('.js-ingredients');
  const tagsListEl = document.querySelector('.js-tags');
  const starsEl = document.querySelector('.js-recipe-stars');

  if (titleEl) titleEl.textContent = data.title || 'No Title';
  if (instructionsEl) instructionsEl.textContent = data.instructions || '';
  if (ratingEl) ratingEl.textContent = data.rating || '0.0';
  if (timeEl) timeEl.textContent = data.time ? `${data.time} min` : '';

  // Malzemeleri Listele
  if (ingredientsListEl && data.ingredients) {
    ingredientsListEl.innerHTML = data.ingredients
      .map(ing => `
        <li class="ingredient-item">
          <span class="ingredient-name">${ing.name}</span>
          <span class="ingredient-measure">${ing.measure}</span>
        </li>`).join('');
  }

  // Etiketleri Listele
  if (tagsListEl && data.tags) {
    tagsListEl.innerHTML = data.tags
      .map(tag => `<li class="recipe-tag-item">#${tag}</li>`).join('');
  }

  // Videoyu Yerleştir
  if (videoWrapperEl && data.youtube) {
    const videoId = data.youtube.includes('=') ? data.youtube.split('=')[1] : data.youtube.split('/').pop();
    videoWrapperEl.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  }
}

// 4. KAPATMA FONKSİYONU
function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    if (videoWrapperEl) videoWrapperEl.innerHTML = ''; 
  }
}

// 5. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
});