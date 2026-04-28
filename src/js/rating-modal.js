// rating-modal.js
document.addEventListener('click', (event) => {
  // 1. "Give a rating" butonuna tıklandığında
  if (event.target.id === 'giveRatingBtn') {
    const recipeModal = document.querySelector('.js-recipe-modal-backdrop');
    const ratingModal = document.querySelector('#ratingModal');

    if (recipeModal) recipeModal.classList.add('is-hidden');
    if (ratingModal) {
        ratingModal.classList.remove('is-hidden');
        // Rating modal açıldığında ekranın kaymasını engellemek için
        document.body.style.overflow = 'hidden';
    }
  }

  // 2. Rating Modal kapatma butonu (X)
  if (event.target.closest('#ratingModal .js-modal-close-btn')) {
    const ratingModal = document.querySelector('#ratingModal');
    if (ratingModal) {
        ratingModal.classList.add('is-hidden');
        document.body.style.overflow = 'auto';
    }
  }
});