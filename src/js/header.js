const themeToggle = document.getElementById('themeToggle');
const desktopToggle = document.getElementById('desktopThemeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function handleToggle() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

themeToggle?.addEventListener('click', handleToggle);
desktopToggle?.addEventListener('click', handleToggle);