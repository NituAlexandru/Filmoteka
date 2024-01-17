import { fetchMovies } from './fetchMovies';
import { createFilmCard } from './createFilmCard';
import Notiflix from 'notiflix';
import { openFilmModal } from './openFilmModal';
import { createPagination } from './createPagination';
import { options } from './options-pagination';
import { Pagination } from 'tui-pagination';

let searchQuery = '';

// Selectarea formularului de căutare și a iconiței de căutare
export const searchForm = document.querySelector('.search-form');
const searchIcon = document.querySelector('.fa.fa-search'); // Asigurați-vă că acest selector corespunde cu iconița de căutare din HTML-ul dvs.

// Event listener pentru submit-ul formularului
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    Notiflix.Notify.failure('Please enter a search term.');
    return;
  }

  try {
    const moviesData = await fetchMovies(searchQuery);
    console.log('Datele primite după căutare:', moviesData);

    if (!moviesData || moviesData.results.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, we couldn't find any films matching "${searchQuery}". Please try a different search term.`
      );
      return;
    } else {
      Notiflix.Notify.success(
        `We found ${moviesData.total_results} films matching "${searchQuery}".`
      );
    }

    const totalPages = moviesData.total_pages;
    createFilmCard(moviesData, totalPages);
    searchForm.reset();
    console.log('Filme gasite', moviesData);
  } catch (error) {
    console.error(
      'Search result is not successful. Enter the correct movie name and press enter',
      error
    );
  }
});

searchIcon.addEventListener('click', () => {
  searchForm.dispatchEvent(new Event('submit'));
});
