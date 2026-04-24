// all-categories.js içinde kategoriye tıklandığında:
async function onCategoryClick(categoryName) {
  // Mert, burada 'fetchRecipes' fonksiyonunu çağırırken
  // varsa arama kutusundaki kelimeyi de gönderebilirsin:
  const data = await fetchRecipes({
    category: categoryName === 'All categories' ? '' : categoryName,
    keyword: document.querySelector('#search-input')?.value.trim() || '',
  });

  // renderRecipesList(data.results); -> Kartları ekrana basan fonksiyonun
}
