import axios from 'axios';
import Notiflix from 'notiflix';
import 'bootstrap/dist/css/bootstrap.min.css'; // Adaugă această linie pentru a importa stilurile Bootstrap
import { createFilmCard } from './createFilmCard.js';
import { API_KEY } from './fetchMovies.js';
import { BASE_URL } from './fetchMovies.js';
import { fetchMovieTrailer } from './fetchMovies.js';

const totalPagesToShow = 30;
let currentPage = 1;

// Funcția pentru afișarea filmelor cu paginare
function createPagination(movies, searchQuery) {
  createFilmCard(movies).then(res => {
    // Adaugă paginare Bootstrap
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (movies.total_pages > 1) {
      const pagination = document.createElement('nav');
      pagination.setAttribute('aria-label', 'Page navigation');

      const pageList = document.createElement('ul');
      pageList.classList.add('pagination');

      const prevPageItem = document.createElement('li');
      prevPageItem.classList.add('page-item');

      const prevPageLink = document.createElement('a');
      prevPageLink.classList.add('page-link');
      prevPageLink.href = '#';
      prevPageLink.innerHTML = '&laquo;';
      prevPageLink.addEventListener('click', async () => {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1;
        const moviesByPage = await fetchMoviesPage(searchQuery, prevPage);
        createPagination(moviesByPage, searchQuery);
      });

      prevPageItem.appendChild(prevPageLink);
      pageList.appendChild(prevPageItem);

      for (
        let i = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
        i <=
        Math.min(
          movies.total_pages,
          currentPage + Math.floor(totalPagesToShow / 2)
        );
        i++
      ) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');

        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', async () => {
          try {
            const moviesByPage = await fetchMoviesPage(searchQuery, i);
            createPagination(moviesByPage, searchQuery);
          } catch (error) {
            console.error('Eroare la încărcarea paginii:', error);
          }
        });

        pageItem.appendChild(pageLink);
        pageList.appendChild(pageItem);
      }
      const nextPageSetItem = document.createElement('li');
      nextPageSetItem.classList.add('page-item');

      const nextPageSetLink = document.createElement('a');
      nextPageSetLink.classList.add('page-link');
      nextPageSetLink.href = '#';
      nextPageSetLink.innerHTML = '&raquo;';
      nextPageSetLink.addEventListener('click', async () => {
        const nextSetPage = Math.min(
          movies.total_pages,
          currentPage + Math.floor(totalPagesToShow / 2) + 1
        );
        const moviesByPage = await fetchMoviesPage(searchQuery, nextSetPage);
        createPagination(moviesByPage, searchQuery);
      });

      nextPageSetItem.appendChild(nextPageSetLink);
      pageList.appendChild(nextPageSetItem);

      pagination.appendChild(pageList);
      paginationContainer.appendChild(pagination);
    }
  });
}

// Funcția pentru a face request la API-ul TMDb
export async function fetchMoviesPage(searchQuery = '', page = 1) {
  let url = '';

  if (searchQuery) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      searchQuery
    )}&page=${page}`;
  } else {
    url = `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`;
  }

  try {
    const res = await axios.get(url);
    console.dir(res.data);
    return res.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
}

// Evenimentul de încărcare al ferestrei
window.addEventListener('load', async () => {
  try {
    const popularMovies = await fetchMoviesPage();
    createPagination(popularMovies);
    console.log('Filme populare:', popularMovies);
    // ... (cod suplimentar pentru afișarea filmelor populare)
  } catch (error) {
    console.error('Eroare la încărcarea filmelor populare:', error);
  }
});
