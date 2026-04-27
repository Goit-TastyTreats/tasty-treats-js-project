const savedTheme = localStorage.getItem('theme');

const hamburgerBtn = document.getElementById('hamburgerBtn');

const mobileMenu = document.getElementById('mobileMenu');

const closeMenuBtn = document.getElementById('closeMenuBtn');

// burger açma

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

// burger kapama

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// ACTIVE PAGE LINK

const currentPage = window.location.pathname;

const desktopLinks = document.querySelectorAll('.nav-link');

desktopLinks.forEach(link => {
  const linkPath = new URL(link.href).pathname;

  if (currentPage === linkPath) {
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

const orderModal = document.getElementById('orderModal');

openOrderModalBtn.addEventListener('click', event => {
  event.preventDefault();

  // modal aç
  orderModal.classList.add('is-open');
});
