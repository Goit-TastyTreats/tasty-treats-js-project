const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const timeSelect = document.querySelector('.time-select');
  const areaSelect = document.querySelector('.area-select');
  const ingredientsSelect = document.querySelector('.ingredients-select');
  const resetBtn = document.querySelector('.reset-btn');

  if (!searchInput || !timeSelect || !areaSelect || !ingredientsSelect || !resetBtn) {
    console.error('Filter elements not found. Please check HTML class names.');
    return;
  }

  const filters = {
    search: '',
    time: '',
    area: '',
    ingredient: '',
  };

  function debounce(callback, delay) {
    let timerId;

    return function (...args) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  function createTimeOptions() {
    for (let i = 5; i <= 120; i += 5) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i} min`;
      timeSelect.appendChild(option);
    }
  }

  async function fetchAreas() {
    const response = await fetch(`${BASE_URL}/areas`);

    if (!response.ok) {
      throw new Error('Areas could not be fetched');
    }

    return response.json();
  }

  async function fetchIngredients() {
    const response = await fetch(`${BASE_URL}/ingredients`);

    if (!response.ok) {
      throw new Error('Ingredients could not be fetched');
    }

    return response.json();
  }

  function renderAreas(areas) {
    const sortedAreas = [...areas].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const markup = sortedAreas
      .map(area => `<option value="${area.name}">${area.name}</option>`)
      .join('');

    areaSelect.insertAdjacentHTML('beforeend', markup);
  }

  function renderIngredients(ingredients) {
    const sortedIngredients = [...ingredients].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const markup = sortedIngredients
      .map(
        ingredient =>
          `<option value="${ingredient._id}">${ingredient.name}</option>`
      )
      .join('');

    ingredientsSelect.insertAdjacentHTML('beforeend', markup);
  }

  function emitFiltersChange() {
    const filtersChangeEvent = new CustomEvent('filters-change', {
      detail: {
        search: filters.search,
        time: filters.time,
        area: filters.area,
        ingredient: filters.ingredient,
      },
    });

    document.dispatchEvent(filtersChangeEvent);
  }

  const debouncedSearch = debounce(event => {
    filters.search = event.target.value.trim();
    emitFiltersChange();
  }, 300);

  searchInput.addEventListener('input', debouncedSearch);

  timeSelect.addEventListener('change', event => {
    filters.time = event.target.value;
    emitFiltersChange();
  });

  areaSelect.addEventListener('change', event => {
    filters.area = event.target.value;
    emitFiltersChange();
  });

  ingredientsSelect.addEventListener('change', event => {
    filters.ingredient = event.target.value;
    emitFiltersChange();
  });

  resetBtn.addEventListener('click', () => {
    filters.search = '';
    filters.time = '';
    filters.area = '';
    filters.ingredient = '';

    searchInput.value = '';
    timeSelect.value = '';
    areaSelect.value = '';
    ingredientsSelect.value = '';

    emitFiltersChange();
  });

  async function initFilters() {
    try {
      createTimeOptions();

      const [areas, ingredients] = await Promise.all([
        fetchAreas(),
        fetchIngredients(),
      ]);

      renderAreas(areas);
      renderIngredients(ingredients);

      emitFiltersChange();
    } catch (error) {
      console.error(error);
    }
  }

  initFilters();
});