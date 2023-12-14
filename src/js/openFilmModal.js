// Incepe cu structura Modalului in film-modal.html
// FT - 17 La click pe cardul filmului de pe oricare pagină, trebuie să se
// deschidă o fereastră modală cu informații introduse dinamic despre film
// FT - 18 La click pe butonul "Add to watched", filmul este adăugat la
// filmele vizionate de utilizatorul curent(firebase)
// FT - 19 La click pe butonul "Add to queue", filmul este adăugat la coada
// de așteptare a utilizatorului curent(firebase)
// Realizează închiderea ferestrei modale prin apăsarea tastei ESC și
// prin click în afara zonei ferestrei modale, nu uita să elimini listeners
import axios from 'axios';
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
       
        <h3>Original title: ${filmData.original_title}</h3>
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
};
