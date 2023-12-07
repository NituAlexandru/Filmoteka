import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
const ENDPOINT = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;

export async function fetchMovies() {
  try {
    const res = await axios.get(ENDPOINT);
    console.dir(res.data)
    return res.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
};