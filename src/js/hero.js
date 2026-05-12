import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/bundle';

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

// Modal
const modalOverlay = document.querySelector('[data-modal-id="order-now"]');
const openBtn = document.querySelector('[data-modal-open="order-now"]');
const closeBtn = document.querySelector('[data-modal-close]');

const openModal = () => {
  modalOverlay.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOverlay.classList.add('is-hidden');
  document.body.style.overflow = '';
  const form = modalOverlay.querySelector('.modal-form');
  if (form) {
    form.reset();
    form.querySelectorAll('.error-msg').forEach(el => el.remove());
    form.querySelectorAll('.modal-input, .modal-textarea').forEach(el => {
      el.style.borderColor = '';
    });
    form.style.display = '';
    const thanks = modalOverlay.querySelector('.thanks-msg');
    if (thanks) thanks.remove();
  }
};

if (modalOverlay && openBtn && closeBtn) {
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('is-hidden')) closeModal();
  });
}

// Form Validation & Submit
const form = document.querySelector('[data-modal-id="order-now"] .modal-form');

if (form) {
  const showError = (input, message) => {
    const existing = input.parentElement.querySelector('.error-msg');
    if (existing) existing.remove();
    input.style.borderColor = 'red';
    const error = document.createElement('span');
    error.classList.add('error-msg');
    error.style.cssText = 'color:red; font-size:12px; display:block; margin-top:4px;';
    error.textContent = message;
    input.parentElement.appendChild(error);
  };

  const clearError = input => {
    const existing = input.parentElement.querySelector('.error-msg');
    if (existing) existing.remove();
    input.style.borderColor = '';
  };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = phone => /^[0-9+\s\-()]{7,15}$/.test(phone);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');

    let isValid = true;

    // Ad kontrolü
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Telefon kontrolü
    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Phone number is required.');
      isValid = false;
    } else if (!validatePhone(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number.');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // E-posta kontrolü
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Tüm alanlar geçerliyse teşekkür mesajı göster
    if (isValid) {
      form.style.display = 'none';

      const thanks = document.createElement('div');
      thanks.classList.add('thanks-msg');
      thanks.style.cssText = 'text-align:center; padding:40px 20px;';
      thanks.innerHTML = `
        <p style="font-size:24px; font-weight:bold; margin-bottom:12px;">🎉 Thank you!</p>
        <p style="font-size:16px; color:#555;">Your order has been received.<br>We will contact you shortly.</p>
      `;
      form.parentElement.appendChild(thanks);

      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  });
}

// Hero Slider
async function initHeroSlider() {
  const wrapperEl = document.querySelector('.swiper-wrapper');
  if (!wrapperEl) return;

  let events;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return;
    events = await response.json();
  } catch {
    return;
  }

  if (!Array.isArray(events) || events.length === 0) return;

  wrapperEl.innerHTML = events
    .map(
      (event, i) => `
      <li class="swiper-slide hero-slide hero-slide--${i}">
        <div class="hero-slide-inner">
          <div class="hero-card--chef" style="background-image: url('${event.cook.imgUrl}')"></div>
          <div class="hero-card--food-sm">
            <div class="hero-card-preview" style="background-image: url('${event.topic.previewUrl}')"></div>
            <p class="hero-card-caption-title">${event.topic.name}</p>
            <p class="hero-card-caption-sub">${event.topic.area}</p>
          </div>
          <div class="hero-card--food-lg" style="background-image: url('${event.topic.previewUrl}')"></div>
        </div>
      </li>
    `
    )
    .join('');

  new Swiper('.hero-swiper', {
    modules: [Pagination, Autoplay],
    spaceBetween: 16,
    slidesPerView: 'auto',
    pagination: {
      el: '.hero-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 800,
    loop: true,
  });
}

initHeroSlider();