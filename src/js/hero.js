const API_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

// Modal
const modalOverlay = document.querySelector('[data-modal-id="order-now"]');
const openBtn = document.querySelector('[data-modal-open="order-now"]');
const closeBtn = document.querySelector('[data-modal-close]');

function openModal() {
  modalOverlay.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.add('is-hidden');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalOverlay.classList.contains('is-hidden')) {
    closeModal();
  }
});

// Slider
async function initSlider() {
  const slidesEl = document.querySelector('[data-slider]');
  const dotsEl = document.querySelector('[data-dots]');

  let events;
  try {
    const res = await fetch(API_URL);
    events = await res.json();
  } catch {
    return;
  }

  events.forEach((event, i) => {
    const li = document.createElement('li');
    li.className = i === 0 ? 'hero-slide hero-slide--0 is-active' : `hero-slide hero-slide--${i}`;
    li.innerHTML = `
      <div class="hero-card hero-card--chef">
        <img src="${event.cook.imgUrl}" alt="${event.cook.name}" loading="${i === 0 ? 'eager' : 'lazy'}" />
      </div>
      <div class="hero-card hero-card--food-sm">
        <img src="${event.topic.previewUrl}" alt="${event.topic.name}" loading="${i === 0 ? 'eager' : 'lazy'}" />
        <div class="hero-card-caption">
          <p class="hero-card-caption-title">${event.topic.name}</p>
          <p class="hero-card-caption-sub">${event.topic.area}</p>
        </div>
      </div>
      <div class="hero-card hero-card--food-lg">
        <img src="${event.topic.imgUrl}" alt="${event.topic.name}" loading="${i === 0 ? 'eager' : 'lazy'}" />
      </div>
    `;
    slidesEl.appendChild(li);

    const btn = document.createElement('button');
    btn.className = i === 0 ? 'hero-dot is-active' : 'hero-dot';
    btn.type = 'button';
    btn.dataset.slide = i;
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    dotsEl.appendChild(btn);
  });

  const slides = slidesEl.querySelectorAll('.hero-slide');
  const dots = dotsEl.querySelectorAll('.hero-dot');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.slide);
      slides.forEach(s => s.classList.remove('is-active'));
      dots.forEach(d => d.classList.remove('is-active'));
      slides[index].classList.add('is-active');
      dot.classList.add('is-active');
    });
  });
}

initSlider();
