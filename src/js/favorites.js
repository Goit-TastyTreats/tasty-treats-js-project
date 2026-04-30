document.addEventListener('DOMContentLoaded', () => {
  const favList = document.querySelector('.fav-recipes-list');
  const noFavContent = document.querySelector('.fav-no-recipes-content');
  
  // 1. Verileri LocalStorage'dan çek
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // 2. Eğer favori yoksa "No recipes" mesajını göster
  if (favorites.length === 0) {
    if (noFavContent) noFavContent.style.display = 'block';
    if (favList) favList.style.display = 'none';
    return;
  }

  // 3. Favori varsa listeyi temizle ve kartları oluştur
  if (noFavContent) noFavContent.style.display = 'none';
  if (favList) {
    favList.style.display = 'flex';
    favList.innerHTML = favorites.map(recipe => `
      <li class="recipe-card" data-id="${recipe._id}">
        <img src="${recipe.preview}" alt="${recipe.title}" class="recipe-img">
        <div class="recipe-info">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <button class="see-recipe-btn" data-id="${recipe._id}">See Recipe</button>
        </div>
      </li>
    `).join('');
  }
});