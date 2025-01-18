`use strict`; // Код у суворому режимі

// Підключаємо бібліотеки
import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css'; // Стилі iziToast підключив через імпорт в styles.css
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css'; // Стилі iziToast підключив через імпорт в styles.css

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true, // Включити підписи
  captionsData: 'alt', // Джерело підпису: атрибут alt
  captionDelay: 250, // Затримка перед відображенням підпису
  animationSpeed: 300, // Швидкість анімації
  overlayOpacity: 0.8, // Прозорість фону
});

const createGalleryCardTemplate = imgInfo => {
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

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedQuery = event.currentTarget.elements.user_query.value.trim();

  if (searchedQuery === '') {
    iziToast.error({
      title: 'Error',
      message: `❌ Поле має бути заповнено!`,
      position: 'topRight',
    });

    return;
  }

  galleryEl.innerHTML = ''; // Очищуємо галерею
  loaderEl.style.display = 'block'; // Показуємо індикатор завантаження

  fetch(
    `https://pixabay.com/api/?key=48208866-6baf83551ffafce9b15eedbf6&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      loaderEl.style.display = 'none'; // Ховаємо індикатор завантаження

      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: `❌ Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        });

        // galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryEl.innerHTML = galleryTemplate;

      lightbox.refresh(); // Оновлюємо SimpleLightbox
    })
    .catch(err => {
      loaderEl.style.display = 'none'; // Ховаємо індикатор завантаження
      iziToast.error({
        title: 'Error',
        message:
          '❌ An error occurred while fetching data. Please try again later.',
        position: 'topRight',
      });
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
