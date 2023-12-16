
import { fetchMovies } from './fetchMovies';
import { createFilmCard } from './createFilmCard';
import { createPagination } from './createPagination';

let searchQuery = '';

export const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  try {
    const moviesData = await fetchMovies(searchQuery);
    const totalPages = 1;
    createFilmCard(moviesData);
    createPagination(moviesData,totalPages);
    searchForm.reset();
    console.log('Filme gasite', moviesData);
  } catch (error) {
    console.error(
      'Search result is not successful. Enter the correct movie name and press enter',
      error
    );
  }
});
