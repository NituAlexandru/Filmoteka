// FT-10 Realizează căutarea și afișarea filmelor după cuvinte cheie
// vezi mesajele de eroare din macheta
// foloseste Notliflix pentru afisare mesaje/alerte/notificari

import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchMovies } from './fetchMovies';

let searchQuery = '';
let currentPage = 1;

export const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  try {
    const moviesData = await fetchMovies(searchQuery);
    console.log('Filme gasite', moviesData);
  } catch (error) {
    console.error(
      'Search result is not successful. Enter the correct movie name and press enter',
      error
    );
  }
});
