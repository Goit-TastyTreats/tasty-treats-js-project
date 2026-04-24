import debounce from 'lodash.debounce';
// import { fetchRecipesByFilter } from './api'; // İleride tarifleri filtrelemek için

const searchInput = document.querySelector('#search-input');

// Kullanıcı yazı yazmayı bıraktıktan 300ms sonra çalışır
const handleSearch = debounce(event => {
  const query = event.target.value.trim(); // Boşlukları temizler

  if (query === '') {
    console.log(
      'Arama temizlendi, tüm tarifler veya seçili kategori getiriliyor...'
    );
    // Burada tüm tarifleri getiren fonksiyonu çağıracağız
  } else {
    console.log(`Aranan kelime: ${query}`);
    // Burada API'ye arama terimiyle istek atacağız
  }
}, 300);

if (searchInput) {
  searchInput.addEventListener('input', handleSearch);
}
