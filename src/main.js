`use strict`; // Код у суворому режимі

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');

const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-card">
      <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
    </li>
  `;
};

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedQuery = event.currentTarget.elements.user_query.value.trim();

  if (searchedQuery === '') {
    alert('Поле має бути заповнено!');

    return;
  }

  console.log(searchedQuery);

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
      console.log(data);

      if (data.hits.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again!'
        );

        galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryEl.innerHTML = galleryTemplate;
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
