// Olay delegasyonu ile butonun her zaman çalışmasını sağlıyoruz
document.addEventListener('click', event => {
  // Give a Rating butonu kontrolü
  const ratingBtn =
    event.target.closest('#giveRatingBtn') ||
    event.target.closest('.js-give-rating-btn');

  if (ratingBtn) {
    const ratingModal = document.querySelector('.js-rating-modal-backdrop');
    if (ratingModal) {
      ratingModal.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden'; // Arka plan kaymasını engeller
    }
  }

  // Kapatma butonu kontrolü
  const closeBtn = event.target.closest('.js-rating-close-btn');
  const ratingBackdrop = document.querySelector('.js-rating-modal-backdrop');

  if (closeBtn || event.target === ratingBackdrop) {
    if (ratingBackdrop) {
      ratingBackdrop.classList.add('is-hidden');
      document.body.style.overflow = 'auto';
    }
  }
});

// Form Gönderim İşlemi
const ratingForm = document.querySelector('.js-rating-form');
if (ratingForm) {
  ratingForm.addEventListener('submit', async e => {
    e.preventDefault();

    // ID'yi tarif modalının data-attribute'undan alıyoruz
    const recipeModal = document.querySelector('.js-recipe-modal');
    const recipeId = recipeModal
      ? recipeModal.getAttribute('data-current-id')
      : null;

    if (!recipeId) {
      alert('Hata: Tarif kimliği bulunamadı!');
      return;
    }

    const email = e.target.elements.email.value;
    const ratingValue = e.target.querySelector(
      'input[name="rating"]:checked'
    )?.value;

    if (!ratingValue) {
      alert('Lütfen bir puan seçin!');
      return;
    }

    // API POST İsteği örneği (Burayı kendi projenin API yapısına göre güncelle)
    try {
      console.log('Gönderiliyor:', { recipeId, email, ratingValue });
      // const response = await fetch(`https://.../recipes/${recipeId}/rating`, { ... });
      alert('Puanınız başarıyla gönderildi!');
      document
        .querySelector('.js-rating-modal-backdrop')
        .classList.add('is-hidden');
      ratingForm.reset();
    } catch (error) {
      console.error('Puan gönderilirken hata oluştu:', error);
    }
  });
}
