import { genres } from './fetchGenres';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const openFilmModal = filmData => {
  // Determinați numele genurilor
  const genreNames = filmData.genre_ids
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : 'Unknown';
    })
    .filter(name => name !== 'Unknown')
    .join(', ');

  let originalTitle;

  if (filmData.media_type === 'movie') {
    originalTitle = filmData.original_title || filmData.title;
  } else if (filmData.media_type === 'tv') {
    originalTitle = filmData.original_name || filmData.name;
  } else {
    originalTitle = filmData.title || 'Unknown Title';
  }

  // Construiți HTML-ul pentru fereastra modală
  const modalHtml = `
    <div class="film-modal">
        <div class="film-modal-content">
         <span class="close-modal">&times;</span>
         <h2 class="film-modal-title">${filmData.title || filmData.name}</h2>
        ${
          filmData.trailerUrl
            ? `<div class="film-modal-trailer">
                   <iframe src="${filmData.trailerUrl}" frameborder="0" allowfullscreen ></iframe>
                    </div>`
            : `<div class="film-modal-poster">
                   <img src="https://image.tmdb.org/t/p/w500${
                     filmData.poster_path
                   }" alt="${filmData.title || filmData.name}">
                </div>`
        }
       
        <h3>Original title: ${originalTitle}</h3>
        <p class="film-modal-score"><span>Score: ${
          typeof filmData.vote_average === 'number'
            ? filmData.vote_average.toFixed(2)
            : 'N/A'
        }</span></p>
        <p class="modal-genre-paragraph"><b>Genre:</b> ${genreNames}</p>
        <h4 class="film-modal-about">ABOUT</h4>
        <p>${filmData.overview}</p>
        <div class="film-modal-actions">
          <button id="addToWatchedBtn">ADD TO WATCHED</button>
          <button id="addToQueueBtn">ADD TO QUEUE</button>
        </div>
      </div>
    </div>`;

  // Adăugați fereastra modală în DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new SimpleLightbox('.film-modal-content a', {
    overlay: true,
    close: true,
    showCounter: true,
  });
  // Adăugați funcționalitatea pentru închiderea ferestrei modale
  const modal = document.querySelector('.film-modal');

  modal.addEventListener('click', event => {
    if (
      event.target === modal ||
      event.target.classList.contains('close-modal')
    ) {
      modal.remove();
    }
  });
  // Funcție pentru a gestiona apăsarea tastei Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.remove();
      console.log('Tasta Escape a fost apăsată!');
    }
  });
};
