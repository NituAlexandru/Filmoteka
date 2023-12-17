import { genres } from './fetchGenres';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './setGetLocalStorage';
import { addToQueue } from './queueManager';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const openFilmModal = (filmData, cardHtml) => {
  // Asigurați-vă că filmData este obiectul așteptat și dacă nu, folosiți filmData.data
  if (
    !filmData ||
    typeof filmData !== 'object' ||
    !filmData.hasOwnProperty('genre_ids')
  ) {
    console.error(
      'Datele filmului nu sunt complete sau sunt într-un format incorect.'
    );
    return;
  }

  // Determinați numele genurilor
  const genreNames = Array.isArray(filmData.genre_ids)
    ? filmData.genre_ids
        .map(id => {
          const genre = genres.find(genre => genre.id === id);
          return genre ? genre.name : 'Unknown';
        })
        .filter(name => name !== 'Unknown')
        .join(', ')
    : 'Unknown';

  let originalTitle = filmData.title || 'Unknown Title';

  if (filmData.hasOwnProperty('media_type')) {
    if (filmData.media_type === 'movie') {
      originalTitle = filmData.original_title || filmData.title;
    } else if (filmData.media_type === 'tv') {
      originalTitle = filmData.original_name || filmData.name;
    }
  }

  // Determina titlul filmului și ID-ul
  const filmTitle = filmData.title || filmData.name;
  const filmId = filmData.id;

  // Verifica dacă filmul este deja în localStorage
  const isFilmInQueue = getFromStorage(filmData.id) !== null;

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
           <button id="addToQueueBtn">${
             isFilmInQueue ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE'
           }</button>
        </div>
      </div>
    </div>`;

  // adauga fereastra modală în DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // selecteaza butonul addToQueueBtn după ce modalul este adăugat în DOM
  const addToQueueBtn = document.querySelector('#addToQueueBtn');

  //------------------------------------------------------------------------------------

  // Setarea textului butonului pe baza stării curente din localStorage
  const setButtonState = () => {
    const isFilmInQueue = getFromStorage(filmData.id) !== null;
    addToQueueBtn.textContent = isFilmInQueue
      ? 'REMOVE FROM QUEUE'
      : 'ADD TO QUEUE';
  };

  setButtonState(); // Setarea inițială a textului butonului

  addToQueueBtn.addEventListener('click', () => {
    const isFilmInQueue = getFromStorage(filmData.id) !== null;
    if (isFilmInQueue) {
      removeFromStorage(filmData.id);
      console.log('Filmul a fost eliminat din coadă');
    } else {
      addToQueue({
        id: filmData.id,
        cardHtml: cardHtml, // Asigurați-vă că aveți HTML-ul cardului aici
        data: filmData, // Datele complete ale filmului
      });
      console.log('Filmul a fost adăugat în coadă');
    }
    setButtonState(); // Actualizați starea butonului după fiecare click
  });

  //-------------------------------------------------------------------------------------

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
