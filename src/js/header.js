

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
// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById('themeToggle');

const desktopThemeToggle = document.getElementById('desktopThemeToggle');


// mobile toggle
themeToggle.addEventListener('click', () => {

  document.body.classList.toggle('dark-theme');

});


// desktop toggle
desktopThemeToggle.addEventListener('click', () => {

  document.body.classList.toggle('dark-theme');

});