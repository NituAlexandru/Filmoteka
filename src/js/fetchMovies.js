import axios from 'axios';
import Notiflix from 'notiflix';

// const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
// const ENDPOINT = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;
// const SEARCH_ENDPOINT = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`
// export async function fetchMovies() {
//   try {
//     const response = await axios.get(ENDPOINT);
//     console.dir(response.data)
//     return response.data;
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Oops! Something went wrong! Try reloading the page!'
//     );
//     throw error;
//   }
// };

// export async function fetchMoviesForSearch(query) {
//   try {
//     const res = await axios.get(SEARCH_ENDPOINT);
//     console.dir(res.data)
//     return res.data;
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Oops! Something went wrong! Try reloading the page!'
//     );
//     throw error;
//   }
// }

const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
const BASE_URL = `https://api.themoviedb.org/3`;
export async function fetchMovies(searchQuery = '') {
  let url = '';
  if (searchQuery) {
    // Caută filme după termenul specificat
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`;
  } else {
    // Returnează filmele populare
    url = `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}`;
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
};


window.addEventListener('load', async () => {
  try {
    const popularMovies = await fetchMovies();
    console.log('Filme populare:', popularMovies);
    // Cod pentru afișarea filmelor populare
  } catch (error) {
    console.error('Eroare la încărcarea filmelor populare:', error);
  }
});
