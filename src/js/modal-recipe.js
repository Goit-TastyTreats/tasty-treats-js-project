import { fetchRecipeById } from './api';

export const openRecipe = id => {
  if (window.openRecipeModal) {
    // Senin modalını açması için API'den veri çekip fonksiyonunu tetikleyelim
    fetch(`https://tasty-treats-backend.p.goit.global/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => window.openRecipeModal(data))
      .catch(err => console.error('Modal açılırken hata:', err));
  }
};
