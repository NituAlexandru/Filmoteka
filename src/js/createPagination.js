import axios from 'axios';
import Notiflix from 'notiflix';
import 'bootstrap/dist/css/bootstrap.min.css'; // Adaugă această linie pentru a importa stilurile Bootstrap
import { createFilmCard } from './createFilmCard';

export const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
export const BASE_URL = `https://api.themoviedb.org/3`;

// Funcția pentru afișarea filmelor cu paginare
function displayMovies(movies, searchQuery) {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  movies.results.forEach(movie => {
    const movieCard = createFilmCard(movie);
    movieContainer.appendChild(movieCard);
  });

  // Adaugă paginare Bootstrap
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (movies.total_pages > 1) {
    const pagination = document.createElement('nav');
    pagination.setAttribute('aria-label', 'Page navigation');

    const pageList = document.createElement('ul');
    pageList.classList.add('pagination');

    for (let i = 1; i <= movies.total_pages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');

      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', async () => {
        try {
          const moviesByPage = await fetchMovies(searchQuery, i);
          displayMovies(moviesByPage, searchQuery);
        } catch (error) {
          console.error('Eroare la încărcarea paginii:', error);
        }
      });

      pageItem.appendChild(pageLink);
      pageList.appendChild(pageItem);
    }

    pagination.appendChild(pageList);
    paginationContainer.appendChild(pagination);
  }
}

// Funcția pentru a face request la API-ul TMDb
export async function fetchMovies(searchQuery = '', page = 1) {
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
    const popularMovies = await fetchMovies();
    displayMovies(popularMovies);
    console.log('Filme populare:', popularMovies);
    // ... (cod suplimentar pentru afișarea filmelor populare)
  } catch (error) {
    console.error('Eroare la încărcarea filmelor populare:', error);
  }
});
