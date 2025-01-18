import{S as u,i as l}from"./assets/vendor-B07T6_gy.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d=r=>`
    <li class="gallery-item gallery-card">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img
          class="gallery-image gallery-img"
          src="${r.webformatURL}"
          alt="${r.tags}"
        />
        <div class="gallery-info">
          <div class="info-item">
            <p>Likes</p>
            <span>${r.likes}</span>
          </div>
          <div class="info-item">
            <p>Views</p>
            <span>${r.views}</span>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <span>${r.comments}</span>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <span>${r.downloads}</span>
          </div>
        </div>
      </a>
    </li>`,m=r=>{const a=new URLSearchParams({key:"48208866-6baf83551ffafce9b15eedbf6",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:30});return fetch(`https://pixabay.com/api/?${a}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},p=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),n=document.querySelector(".js-loader");let y=new u(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlayOpacity:.8});const f=r=>{r.preventDefault();const a=r.currentTarget.elements.user_query.value.trim();if(a===""){l.error({title:"Error",message:"❌ Поле має бути заповнено!",position:"topRight"});return}c.innerHTML="",n.style.display="block",m(a).then(s=>{if(n.style.display="none",s.hits.length===0){l.error({title:"Error",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),p.reset();return}const o=s.hits.map(e=>d(e)).join("");c.innerHTML=o,y.refresh()}).catch(s=>{n.style.display="none",l.error({title:"Error",message:"❌ An error occurred while fetching data. Please try again later.",position:"topRight"}),console.log(s)})};p.addEventListener("submit",f);
//# sourceMappingURL=index.js.map
