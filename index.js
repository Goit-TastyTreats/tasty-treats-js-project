/* empty css                      */import{a as g,d as $}from"./assets/vendor-BWiNTx3g.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(a){if(a.ep)return;a.ep=!0;const t=o(a);fetch(a.href,t)}})();const E="https://tasty-treats-backend.p.goit.global/api/events",d=document.querySelector('[data-modal-id="order-now"]'),S=document.querySelector('[data-modal-open="order-now"]'),q=document.querySelector("[data-modal-close]");function w(){d.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function f(){d.classList.add("is-hidden"),document.body.style.overflow=""}S.addEventListener("click",w);q.addEventListener("click",f);d.addEventListener("click",e=>{e.target===d&&f()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!d.classList.contains("is-hidden")&&f()});async function A(){const e=document.querySelector("[data-slider]"),r=document.querySelector("[data-dots]");let o;try{o=await(await fetch(E)).json()}catch{return}o.forEach((t,c)=>{const s=document.createElement("li");s.className=c===0?"hero-slide hero-slide--0 is-active":`hero-slide hero-slide--${c}`,s.innerHTML=`
      <div class="hero-card hero-card--chef">
        <img src="${t.cook.imgUrl}" alt="${t.cook.name}" loading="${c===0?"eager":"lazy"}" />
      </div>
      <div class="hero-card hero-card--food-sm">
        <img src="${t.topic.previewUrl}" alt="${t.topic.name}" loading="${c===0?"eager":"lazy"}" />
        <div class="hero-card-caption">
          <p class="hero-card-caption-title">${t.topic.name}</p>
          <p class="hero-card-caption-sub">${t.topic.area}</p>
        </div>
      </div>
      <div class="hero-card hero-card--food-lg">
        <img src="${t.topic.imgUrl}" alt="${t.topic.name}" loading="${c===0?"eager":"lazy"}" />
      </div>
    `,e.appendChild(s);const l=document.createElement("button");l.className=c===0?"hero-dot is-active":"hero-dot",l.type="button",l.dataset.slide=c,l.setAttribute("aria-label",`Slide ${c+1}`),r.appendChild(l)});const i=e.querySelectorAll(".hero-slide"),a=r.querySelectorAll(".hero-dot");a.forEach(t=>{t.addEventListener("click",()=>{const c=Number(t.dataset.slide);i.forEach(s=>s.classList.remove("is-active")),a.forEach(s=>s.classList.remove("is-active")),i[c].classList.add("is-active"),t.classList.add("is-active")})})}A();const y="https://tasty-treats-backend.p.goit.global/api";async function B(){try{const{data:e}=await g.get(`${y}/categories`);return e}catch(e){return console.error("Kategoriler çekilirken hata oluştu:",e.message),[]}}async function M(){try{const{data:e}=await g.get(`${y}/recipes/popular`);return e}catch(e){return console.error("Popüler tarifler çekilirken hata oluştu:",e.message),[]}}async function N(e={}){try{const{data:r}=await g.get(`${y}/recipes`,{params:{page:e.page||1,limit:e.limit||9,category:e.category||"",area:e.area||"",ingredient:e.ingredient||"",time:e.time||""}});return r}catch(r){return console.error("Tarifler çekilirken hata:",r.message),{results:[]}}}const v=document.querySelector(".recipe-list-container");async function h(e={}){try{const{results:r}=await N(e),o=r.map(({_id:i,title:a,preview:t,description:c,rating:s})=>`
  <li class="recipe-card" data-id="${i}" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('${t}')">
    <div class="card-content">
      <h3 class="card-title">${a}</h3>
      <p class="card-description">${c}</p>
      <div class="card-footer">
        <div class="rating-wrapper">
          <span class="rating-number">${s.toFixed(1)}</span>
          </div>
        <button type="button" class="see-recipe-btn">See recipe</button>
      </div>
    </div>
  </li>
`).join("");v&&(v.innerHTML=o)}catch(r){console.error("Tarifler yüklenemedi:",r)}}h();const u=document.querySelector("#category-list"),m=document.querySelector("#all-category-btn");async function P(){try{const r=(await B()).map(({name:o})=>`
      <li class="cat-items">
        <button type="button" class="category-btn" data-name="${o}">${o}</button>
      </li>
    `).join("");u&&(u.innerHTML=r)}catch(e){console.error("Kategoriler yüklenirken hata oluştu:",e)}}u&&u.addEventListener("click",e=>{if(e.target.nodeName!=="BUTTON")return;document.querySelectorAll(".category-btn, #all-category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const r=e.target.dataset.name;h({category:r})});m&&m.addEventListener("click",()=>{document.querySelectorAll(".category-btn").forEach(e=>e.classList.remove("active")),m.classList.add("active"),h()});P();const p=document.querySelector(".popular-recipes-list");async function T(){try{const e=await M();if(!e||e.length===0)return;const r=e.map(({_id:o,title:i,description:a,preview:t})=>`
      <li class="popular-recipe-item" data-id="${o}">
        <img class="popular-recipe-img" src="${t}" alt="${i}">
        <div class="popular-recipe-info">
          <h3 class="popular-recipe-title">${i}</h3>
          <p class="popular-recipe-description">${a}</p>
        </div>
      </li>
    `).join("");p&&(p.innerHTML=r)}catch(e){console.error("Popüler tarifler basılırken hata oluştu:",e)}}T();p&&p.addEventListener("click",e=>{const r=e.target.closest(".popular-recipe-item");if(r){const o=r.dataset.id;console.log("Açılacak Tarif ID:",o)}});const L=document.querySelector("#search-input"),I=$(e=>{const r=e.target.value.trim();console.log(r===""?"Arama temizlendi, tüm tarifler veya seçili kategori getiriliyor...":`Aranan kelime: ${r}`)},300);L&&L.addEventListener("input",I);const b=document.getElementById("open-team-modal"),k=document.getElementById("close-team-modal"),n=document.getElementById("team-modal");b&&n&&b.addEventListener("click",()=>{n.classList.remove("is-hidden"),console.log("Modal açıldı!")});k&&n&&k.addEventListener("click",()=>{n.classList.add("is-hidden")});n&&n.addEventListener("click",e=>{e.target===n&&n.classList.add("is-hidden")});
//# sourceMappingURL=index.js.map
