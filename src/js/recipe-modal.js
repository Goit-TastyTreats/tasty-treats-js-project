
Sevcan Özdemir <colaksevcan@gmail.com>
03:23 (9 saat önce)
Alıcı: ben

// 1. MODAL ELEMENTLERİNİ SEÇELİM (Global olarak en üstte dursunlar)
const modalBackdrop = document.querySelector('.js-recipe-modal-backdrop');
const closeBtn = document.querySelector('.js-modal-close-btn');
const videoWrapperEl = document.querySelector('.video-wrapper');

// 2. MERT VE ATEŞ BEY İÇİN KÜRESEL AÇMA FONKSİYONU
window.openRecipeModal = function(recipeData) {
  console.log("Dışarıdan veri geldi, modal tetiklendi!", recipeData);

  if (!recipeData) return;

  // Önce içeriği doldur
  renderModalContent(recipeData);

  // Modalı aç
  if (modalBackdrop) {
    modalBackdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  }
};

// 3. İÇERİĞİ HTML'E BASAN ANA FONKSİYON
function renderModalContent(data) {
  const titleEl = document.querySelector('.js-recipe-title');
  const instructionsEl = document.querySelector('.js-instructions');
  const ratingEl = document.querySelector('.js-recipe-rating');
  const timeEl = document.querySelector('.js-recipe-time');
  const ingredientsListEl = document.querySelector('.js-ingredients');
  const tagsListEl = document.querySelector('.js-tags');
  const starsEl = document.querySelector('.js-recipe-stars');

  // Metinleri Doldur
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
        </li>
      `).join('');
  }

  // Etiketleri Listele
  if (tagsListEl && data.tags) {
    tagsListEl.innerHTML = data.tags
      .map(tag => `<li class="recipe-tag-item">#${tag}</li>`)
      .join('');
  }

  // Yıldızları Boya
  if (starsEl) {
    const roundedRating = Math.round(data.rating || 0);
    const stars = starsEl.querySelectorAll('.star-icon');
    stars.forEach((star, index) => {
      index < roundedRating ? star.classList.add('filled') : star.classList.remove('filled');
    });
  }

  // Videoyu Yerleştir
  if (videoWrapperEl && data.youtube) {
    const videoId = data.youtube.includes('=') ? data.youtube.split('=')[1] : data.youtube.split('/').pop();
    videoWrapperEl.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" allowfullscreen></iframe>`;
  }
}

// 4. KAPATMA FONKSİYONU
function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    if (videoWrapperEl) videoWrapperEl.innerHTML = ''; // Video sesini kesmek için
  }
}

// 5. SAYFA YÜKLENİNCE ÇALIŞACAK DİNLEYİCİLER
document.addEventListener('DOMContentLoaded', () => {
  console.log("Modal sistemi hazır.");

  // Kapatma butonu dinleyicisi
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Arka plana tıklayınca kapatma
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // ATEŞ BEY'İN BUTONLARI İÇİN (Eğer sayfada varsa)
  document.body.addEventListener('click', async (event) => {
    const targetBtn = event.target.closest('.see-recipe-btn');
    if (!targetBtn) return;

    const recipeId = targetBtn.dataset.id;
    if (recipeId) {
      try {
        const response = await fetch(`https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`);
        const data = await response.json();
        window.openRecipeModal(data);
      } catch (error) {
        console.error("Tarif çekilemedi:", error);
      }
    }
  });
});