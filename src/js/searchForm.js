import { fetchMovies } from './fetchMovies';
import { createFilmCard } from './createFilmCard';
import { createPagination } from './createPagination';
import Notiflix from 'notiflix';
import { openFilmModal } from './openFilmModal';

let searchQuery = '';

export const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

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
    createFilmCard(moviesData);
    createPagination(moviesData, totalPages);
    searchForm.reset();
    console.log('Filme gasite', moviesData);
  } catch (error) {
    console.error(
      'Search result is not successful. Enter the correct movie name and press enter',
      error
    );
  }
});
