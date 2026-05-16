import{d as e,i as t,l as n,o as r,s as i}from"./assets/rating-modal-CRbJLA8H.js";var a=document.querySelector(`.fav-hero-pic`),o=document.querySelector(`.fav-category-recipe-list`),s=document.querySelector(`.fav-recipes-list`),c=document.querySelector(`.fav-no-recipes-content`);document.querySelector(`.all-category-btn`);var l=[];u();async function u(){let e=n();if(!e||e.length===0){p();return}try{let n=(await Promise.all(e.map(e=>t(e)))).filter(Boolean);if(n.length===0){p();return}l=n,m(),f(n),d(n)}catch(e){console.error(e),p()}}function d(e){s.innerHTML=``;let t=e.map(e=>`
      <li class="recipes-item" id="${e._id}">
        <svg class="favorite-icon favorite-icon-active" data-id="${e._id}">
          <use href="${i}#icon-heart"></use>
        </svg>
        <img class="card-img" src="${e.preview}" alt="${e.description}" loading="lazy" />
        <div class="recipe-card">
          <div class="text-content">
            <p class="recipe-card-title">${e.title}</p>
            <p class="recipe-card-description">${e.description}</p>
          </div>
          <div class="card-btn-container">
            <div class="rating-container">
              <span class="rating-value">${e.rating||0}</span>
              <span class="rating-stars">${r(e.rating)}</span>
            </div>
            <button type="button" class="see-recipe-btn" name="${e._id}" data-modal-recipte-open>
              See recipe
            </button>
          </div>
        </div>
      </li>
    `).join(``);s.insertAdjacentHTML(`beforeend`,t)}function f(e){let t=[...new Set(e.map(e=>e.category))];o.innerHTML=``,o.insertAdjacentHTML(`beforeend`,`<button type="button" class="all-category-btn fav-category-btn">All categories</button>`);let n=t.map(e=>`<button type="button" class="fav-category-btn">${e}</button>`).join(``);o.insertAdjacentHTML(`beforeend`,n)}o.addEventListener(`click`,e=>{if(!e.target.classList.contains(`fav-category-btn`))return;let t=e.target.textContent;if(t===`All categories`){d(l);return}d(l.filter(e=>e.category===t))}),s.addEventListener(`click`,t=>{let n=t.target.closest(`.favorite-icon`);if(n){let t=n.dataset.id;n.classList.remove(`favorite-icon-active`),setTimeout(()=>{l=l.filter(e=>e._id!==t),e(t),d(l),f(l),l.length===0&&p()},300)}let r=t.target.closest(`.see-recipe-btn`);if(r){let e=r.name;openRecipe(e)}});function p(){c.classList.remove(`is-hidden`),a.style.display=`none`,o.style.display=`none`,s.style.display=`none`}function m(){c.classList.add(`is-hidden`),a.style.display=``,o.style.display=``,s.style.display=``}document.addEventListener(`favoriteRemoved`,t=>{let n=t.detail.id;l=l.filter(e=>e._id!==n),e(n),d(l),f(l),l.length===0&&p()});
//# sourceMappingURL=favorites.js.map