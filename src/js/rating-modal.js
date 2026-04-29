// rating-modal.js

// 1. MODALI AÇMA VE KAPATMA MANTIĞI
document.addEventListener('click', (event) => {
  const ratingBtn = event.target.closest('#giveRatingBtn') || event.target.closest('.js-give-rating-btn');
  const closeBtn = event.target.closest('.js-modal-close-btn');
  const ratingModal = document.getElementById('ratingModal');

  // Açma butonu tıklandığında
  if (ratingBtn) {
    if (ratingModal) {
      ratingModal.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden'; 
    }
  }

  // Kapatma butonu veya backdrop tıklandığında
  if (closeBtn || event.target === ratingModal) {
    if (ratingModal) {
      ratingModal.classList.add('is-hidden');
      document.body.style.overflow = 'auto';
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ratingModal = document.getElementById('ratingModal');
  const ratingForm = document.querySelector('.js-rating-form');
  const stars = document.querySelectorAll('.rating-star-item');
  const ratingText = document.querySelector('.js-rating-value');
  
  let currentRating = 0;

  // 1. Yıldız Seçme Mantığı
  stars.forEach(item => {
    item.addEventListener('click', () => {
      currentRating = item.getAttribute('data-value');
      ratingText.textContent = `${currentRating}.0`;

      // Yıldızları görsel olarak boya
      stars.forEach(star => {
        const icon = star.querySelector('.star-icon');
        if (star.getAttribute('data-value') <= currentRating) {
          icon.classList.add('filled');
        } else {
          icon.classList.remove('filled');
        }
      });
    });
  });

  // 2. Formu API'ye Gönderme
  ratingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.elements.email.value;

    // API'nin beklediği veri yapısı (Genelde id, rating ve email ister)
    const dataToSend = {
      rating: Number(currentRating),
      email: email
    };

    try {
      // Örnek API URL'i (Tasty Treats dökümanına göre düzenle)
      const response = await fetch('https://tasty-treats-backend.p.goit.global/api/orders/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('Puanınız başarıyla gönderildi!');
        ratingForm.reset();
        ratingModal.classList.add('is-hidden');
      } else {
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('API Hatası:', error);
    }
  });
});