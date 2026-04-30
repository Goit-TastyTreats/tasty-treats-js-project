// 1. MODALI AÇMA VE KAPATMA MANTIĞI
document.addEventListener('click', (event) => {
  const ratingBtn = event.target.closest('#giveRatingBtn') || event.target.closest('.js-give-rating-btn');
  const closeBtn = event.target.closest('.js-modal-close-btn');
  const ratingModal = document.getElementById('ratingModal');

  if (ratingBtn) {
    if (ratingModal) {
      // Önce recipe modalını kapat
      const recipeModalBackdrop = document.getElementById('recipeModal');
      if (recipeModalBackdrop) {
        recipeModalBackdrop.classList.add('is-hidden');
      }

      // 300ms bekle sonra rating modalını aç
      setTimeout(() => {
        ratingModal.classList.remove('is-hidden');
        document.body.style.overflow = 'hidden';
      }, 300);
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


// Elementleri seçiyoruz
const stars = document.querySelectorAll('.rating-star-item');
const ratingValueText = document.querySelector('.js-rating-value');
const ratingForm = document.querySelector('.js-rating-form');

// Her bir yıldıza tıklama olayı ekliyoruz
stars.forEach((star) => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value'); // Tıklanan yıldızın rakam değerini al (1, 2, 3...)

    // 1. Puan yazısını güncelle (Örn: 3.0)
    ratingValueText.textContent = `${value}.0`;

    // 2. Yıldızların boyanmasını sağla
    updateStars(value);
  });
});

// Yıldızları boyama fonksiyonu
function updateStars(currentValue) {
  stars.forEach((star) => {
    const starValue = star.getAttribute('data-value');

    if (starValue <= currentValue) {
      // Tıklanan değerden küçük veya eşit olanlara 'active' sınıfı ekle (Sarı yap)
      star.classList.add('active');
    } else {
      // Büyük olanlardan 'active' sınıfını çıkar (Gri yap)
      star.classList.remove('active');
    }
  });
}


// Yıldızları boyama fonksiyonu

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