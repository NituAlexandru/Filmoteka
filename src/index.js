import { fetchMovies } from './js/fetchMovies.js';
import { createFilmCard } from './js/createFilmCard.js';
import { searchForm } from './js/searchForm.js';
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

window.addEventListener('load', async () => {
  try {
    const popularMovies = await fetchMovies();
    createPagination(popularMovies);
    searchForm(popularMovies);
    console.log('Filme populare:', popularMovies);
    // ... (cod suplimentar pentru afișarea filmelor populare)
  } catch (error) {
    console.error('Eroare la încărcarea filmelor populare:', error);
  }
});
