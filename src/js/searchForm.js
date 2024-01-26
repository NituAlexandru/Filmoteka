import { fetchMovies } from './fetchMovies';
import { options, totalItems } from './options-pagination';
import { createPagination } from './createPagination';
import Notiflix from 'notiflix';

let searchQuery = '';
export let currentSearchQuery = '';

// Selectarea formularului de căutare și a iconiței de căutare
export const searchForm = document.querySelector('.search-form');
const searchIcon = document.querySelector('.fa.fa-search'); // Asigurați-vă că acest selector corespunde cu iconița de căutare din HTML-ul dvs.

// Event listener pentru submit-ul formularului
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userSearchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!userSearchQuery) {
    Notiflix.Notify.failure('Please enter a search term.');
    return;
  }

  currentSearchQuery = userSearchQuery;

  try {
    const moviesData = await fetchMovies(currentSearchQuery);
    options.totalItems = moviesData.total_pages;
    console.log('Datele primite după căutare:', moviesData);

    if (!moviesData || moviesData.results.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, we couldn't find any films matching "${currentSearchQuery}". Please try a different search term.`
      );
      return;
    } else {
      Notiflix.Notify.success(
        `We found ${moviesData.total_results} films matching "${currentSearchQuery}".`
      );
    }
    

    createPagination(totalItems);

    searchForm.elements.searchQuery.value = '';
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
