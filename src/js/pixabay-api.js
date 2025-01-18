`use strict`; // Код у суворому режимі

// Функції для HTTP-запитів

export const fetchPhotoByQuery = searchedQuery => {
  const searchParams = new URLSearchParams({
    key: `48208866-6baf83551ffafce9b15eedbf6`,
    q: searchedQuery,
    image_type: 'photo',
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: 30,
  });
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
