import { fetchMovieTrailer } from './js/fetchMovies.js';
fetchMovieTrailer();
import { fetchMovies } from './js/fetchMovies.js';
fetchMovies();
import { createFilmCard } from './js/createFilmCard.js';
createFilmCard();

import { searchForm } from './js/searchForm.js';
window.addEventListener('load', async () => {
  try {
    const popularMovies = await fetchMovies();
    createPagination(popularMovies);

    // console.log('Filme populare:', popularMovies);
  } catch (error) {
    // console.error('Eroare la încărcarea filmelor populare:', error);
  }
});

import { modal, btn, span } from './js/footerModal.js';
import { createPagination } from './js/createPagination.js';
import { openFilmModal } from './js/openFilmModal.js';

import footerGetFullYear from './js/footerGetFullYear.js';
document.addEventListener('DOMContentLoaded', () => {
  footerGetFullYear();
});

import { setupMyLibraryLink } from './js/myLibrary.js';
document.addEventListener('DOMContentLoaded', () => {
  setupMyLibraryLink();
});


