import { createOrder } from './api.js';

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
  });

  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  const currentPage = window.location.pathname.split('/').pop();
  const allLinks = document.querySelectorAll('.nav-link');
  allLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage) link.classList.add('active-link');
  });

  const themeToggle = document.getElementById('themeToggle');
  const desktopThemeToggle = document.getElementById('desktopThemeToggle');

  if (savedTheme === 'dark') document.body.classList.add('dark-theme');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  desktopThemeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

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
      form.querySelectorAll('input, textarea').forEach(el => { el.style.borderColor = ''; });
      form.style.display = '';
      const thanks = orderModal.querySelector('.thanks-msg');
      if (thanks) thanks.remove();
      const connErr = form.querySelector('.connection-error');
      if (connErr) connErr.remove();
      localStorage.removeItem('orderFormData');
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
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !orderModal.classList.contains('is-hidden')) closeModal();
    });

    const form = orderModal.querySelector('.modal-form');

    if (form) {
      // Form verilerini localStorage'a kaydet
      const saveFormData = () => {
        const data = {
          name: form.querySelector('input[name="name"]').value,
          phone: form.querySelector('input[name="phone"]').value,
          email: form.querySelector('input[name="email"]').value,
          comment: form.querySelector('textarea[name="comment"]').value,
        };
        localStorage.setItem('orderFormData', JSON.stringify(data));
      };

      // Form verilerini localStorage'dan yükle
      const loadFormData = () => {
        const saved = localStorage.getItem('orderFormData');
        if (!saved) return;
        const data = JSON.parse(saved);
        form.querySelector('input[name="name"]').value = data.name || '';
        form.querySelector('input[name="phone"]').value = data.phone || '';
        form.querySelector('input[name="email"]').value = data.email || '';
        form.querySelector('textarea[name="comment"]').value = data.comment || '';
      };

      // Her input değişiminde kaydet
      form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', saveFormData);
      });

      // Sayfa açılınca yükle
      loadFormData();

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
      const validatePhone = phone => /^\+?[0-9]{10,15}$/.test(phone);

      form.addEventListener('submit', e => {
        e.preventDefault();

        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const emailInput = form.querySelector('input[name="email"]');

        let isValid = true;

        if (!nameInput.value.trim()) {
          showError(nameInput, 'Name is required.');
          isValid = false;
        } else clearError(nameInput);

        if (!phoneInput.value.trim()) {
          showError(phoneInput, 'Phone number is required.');
          isValid = false;
        } else if (phoneInput.value.trim().replace(/\D/g, '').length > 15) {
          showError(phoneInput, 'Phone number must not exceed 15 digits.');
          isValid = false;
        } else if (!validatePhone(phoneInput.value.trim())) {
          showError(phoneInput, 'Please enter a valid phone number. (e.g. +38012345678)');
          isValid = false;
        } else clearError(phoneInput);

        if (!emailInput.value.trim()) {
          showError(emailInput, 'Email is required.');
          isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
          showError(emailInput, 'Please enter a valid email address.');
          isValid = false;
        } else clearError(emailInput);

        if (isValid) {
          const orderData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim().startsWith('+')
              ? phoneInput.value.trim()
              : '+' + phoneInput.value.trim(),
            email: emailInput.value.trim().toLowerCase(),
            comment: form.querySelector('textarea[name="comment"]')?.value.trim() || 'No comment',
          };

          createOrder(orderData)
            .then(() => {
              form.style.display = 'none';
              const thanks = document.createElement('div');
              thanks.classList.add('thanks-msg');
              thanks.style.cssText = 'text-align:center; padding:40px 20px;';
              thanks.innerHTML = `
                <p style="font-size:24px; font-weight:bold; margin-bottom:12px;">🎉 Thank you!</p>
                <p style="font-size:16px; color:#555;">Your order has been received.<br>We will contact you shortly.</p>
              `;
              form.parentElement.appendChild(thanks);
              setTimeout(() => { closeModal(); }, 3000);
            })
            .catch((error) => {
              const existing = form.querySelector('.connection-error');
              if (existing) existing.remove();
              const errorDiv = document.createElement('div');
              errorDiv.classList.add('connection-error');
              errorDiv.style.cssText = 'color:red; text-align:center; margin-top:12px;';
              if (error.response) {
                errorDiv.textContent = error.response.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
              } else {
                errorDiv.textContent = 'Bağlantı hatası! Lütfen internet bağlantınızı kontrol edin.';
              }
              form.appendChild(errorDiv);
              setTimeout(() => errorDiv.remove(), 4000);
            });
        }
      });
    }
  }

  document.addEventListener('click', event => {
    const isMenuOpen = mobileMenu.classList.contains('active');
    if (isMenuOpen && !mobileMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
    }
  });
});