window.addEventListener('load', () => {
const savedTheme = localStorage.getItem('theme');

const hamburgerBtn = document.getElementById('hamburgerBtn');

const mobileMenu = document.getElementById('mobileMenu');

const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');
// burger açma

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');

  menuOverlay.classList.add('active');
});

// burger kapama

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');

  menuOverlay.classList.remove('active');
});

// ACTIVE PAGE LINK

const currentPage = window.location.pathname
  .split('/')
  .pop();

const allLinks = document.querySelectorAll('.nav-link');

allLinks.forEach(link => {
  const linkPage = link
    .getAttribute('href')
    .split('/')
    .pop();

  if (currentPage === linkPage) {
    link.classList.add('active-link');
  }
});

// TOGGLE tema

const themeToggle = document.getElementById('themeToggle');

const desktopThemeToggle = document.getElementById('desktopThemeToggle');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
desktopThemeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// ORDER MODAL penceresi

const openOrderModalBtn = document.getElementById('openOrderModal');

const orderModal = document.querySelector('[data-modal-id="order-now"]');

const closeModal = () => {
  if (!orderModal) return;
  orderModal.classList.add('is-hidden');
  document.body.style.overflow = '';

  const form = orderModal.querySelector('.modal-form');
  if (form) {
    form.reset();
    form.querySelectorAll('.error-msg').forEach(el => el.remove());
    form.querySelectorAll('input, textarea').forEach(el => {
      el.style.borderColor = '';
    });
    form.style.display = '';
    const thanks = orderModal.querySelector('.thanks-msg');
    if (thanks) thanks.remove();
  }
};

if (openOrderModalBtn && orderModal) {
  openOrderModalBtn.addEventListener('click', event => {
    event.preventDefault();
    orderModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  });
}

if (orderModal) {
  const closeOrderModalBtn = orderModal.querySelector('[data-modal-close]');

  closeOrderModalBtn.addEventListener('click', closeModal);

  orderModal.addEventListener('click', event => {
    if (event.target === orderModal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !orderModal.classList.contains('is-hidden')) closeModal();
  });

  // FORM VALIDATION
  const form = orderModal.querySelector('.modal-form');

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
}

document.addEventListener('click', event => {
  const isMenuOpen = mobileMenu.classList.contains('active');

  if (
    isMenuOpen &&
    !mobileMenu.contains(event.target) &&
    !hamburgerBtn.contains(event.target)
  ) {
    mobileMenu.classList.remove('active');

    menuOverlay.classList.remove('active');
  }
});
});