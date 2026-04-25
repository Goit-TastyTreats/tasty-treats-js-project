
const openModalBtn = document.getElementById('open-team-modal');
const closeModalBtn = document.getElementById('close-team-modal');
const teamBackdrop = document.getElementById('team-modal');

// Açma işlemi
if (openModalBtn && teamBackdrop) {
  openModalBtn.addEventListener('click', () => {
    teamBackdrop.classList.remove('is-hidden');
    console.log("Modal açıldı!"); // Test için konsola yazar
  });
}

// Kapatma işlemi
if (closeModalBtn && teamBackdrop) {
  closeModalBtn.addEventListener('click', () => {
    teamBackdrop.classList.add('is-hidden');
  });
}

// Arka plana tıklayınca kapatma
if (teamBackdrop) {
  teamBackdrop.addEventListener('click', (e) => {
    if (e.target === teamBackdrop) {
      teamBackdrop.classList.add('is-hidden');
    }
  });
}