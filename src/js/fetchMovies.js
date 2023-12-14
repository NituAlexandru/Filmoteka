import axios from 'axios';
import Notiflix from 'notiflix';
import { createFilmCard } from './createFilmCard';

export const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
export const BASE_URL = `https://api.themoviedb.org/3`;

async function fetchMovieTrailer(movieId) {
  const trailerUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(trailerUrl);
    const trailers = response.data.results;
    const youtubeTrailer = trailers.find(
      trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer'
    );

    return youtubeTrailer
      ? `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`
      : null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    return null;
  }
}

export async function fetchMovies(searchQuery = '') {
  let url = '';
  if (searchQuery) {
    // Caută filme după termenul specificat
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      searchQuery
    )}&page=1`;
  } else {
    // Returnează filmele populare
    url = `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}`;
  }
  try {
    const response = await axios.get(url);
    const moviesWithTrailers = await Promise.all(
      response.data.results.map(async movie => {
        try {
          const trailerUrl = await fetchMovieTrailer(movie.id);
          return { ...movie, trailerUrl };
        } catch (error) {
          return { ...movie, trailerUrl: null };
        }
      })
    );
    // console.dir(response.data);
    return { ...response.data, results: moviesWithTrailers };
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
}

window.addEventListener('load', async () => {
  try {
    const popularMovies = await fetchMovies();
    createFilmCard(popularMovies);
    console.log('Filme populare:', popularMovies);
    // Cod pentru afișarea filmelor populare
  } catch (error) {
    console.error('Eroare la încărcarea filmelor populare:', error);
  }
});
