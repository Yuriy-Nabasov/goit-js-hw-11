`use strict`; // Код у суворому режимі

// Функції для відображення елементів інтерфейсу

export const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-item gallery-card">
      <a class="gallery-link" href="${imgInfo.largeImageURL}">
        <img
          class="gallery-image gallery-img"
          src="${imgInfo.webformatURL}"
          alt="${imgInfo.tags}"
        />
        <div class="gallery-info">
          <div class="info-item">
            <p>Likes</p>
            <span>${imgInfo.likes}</span>
          </div>
          <div class="info-item">
            <p>Views</p>
            <span>${imgInfo.views}</span>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <span>${imgInfo.comments}</span>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <span>${imgInfo.downloads}</span>
          </div>
        </div>
      </a>
    </li>`;
};
