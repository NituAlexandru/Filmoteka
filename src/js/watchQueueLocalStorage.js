
import { getFromStorage } from "./setGetLocalStorage";
import { createFilmCard } from "./createFilmCard";
import { openFilmModal } from "./openFilmModal";

function localStorageFunction(movieData) {
  const filmObject = JSON.stringify(movieData);
  const isLibraryPage = location.pathname.includes('queue');
  const selectMovieId = document.querySelector(`[data-id="${movieData.id}"]`);

  const watchBtn = document.getElementById('addToWatchedBtn');
  const queueBtn = document.getElementById('addToQueueBtn');

  watchBtn.addEventListener('click', addToWatch);
  queueBtn.addEventListener('click', addToQueue);

  if (
    localStorage.getItem('watch').includes(filmObject) &&
    localStorage.getItem('watch').length > 2
  ) {
    // watchBtn.classList.add('button--accent-btn'); // de schimbat stilul
    watchBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (
    localStorage.getItem('queue').includes(filmObject) &&
    localStorage.getItem('queue').length > 2
  ) {
    // queueBtn.classList.add('button--accent-btn'); // de schimbat stilul
    queueBtn.textContent = 'REMOVE FROM QUEUE';
  }

  function addToWatch() {
    if (movieData) {
      let film = JSON.parse(localStorage.getItem('watch')) || [];
      if (film.find(e => e.id === movieData.id)) {
        // watchBtn.classList.remove('button--accent-btn'); // de schimbat stilul
        watchBtn.textContent = 'ADD TO WATCHED';
        film = film.filter(e => e.id !== movieData.id);
        if (isLibraryPage && selectMovieId && refs.isWatchTabActive) {
          selectMovieId.remove();
        }
      } else {
        // watchBtn.classList.add('button--accent-btn'); // de schimbat stilul
        watchBtn.textContent = 'REMOVE FROM WATCHED';
        film.push(movieData);
      }
      localStorage.setItem('watch', JSON.stringify(film));
    }
    isLocalStorageEmpty('watch');
  }

  function addToQueue() {
    if (movieData) {
      let film = JSON.parse(localStorage.getItem('queue')) || [];
      if (film.find(e => e.id === movieData.id)) {
        // queueBtn.classList.remove('button--accent-btn'); // de schimbat stilul
        queueBtn.textContent = 'ADD TO QUEUE';
        film = film.filter(e => e.id !== movieData.id);

        if (isLibraryPage && selectMovieId && !refs.isWatchTabActive) {
          selectMovieId.remove();
        }
      } else {
        // queueBtn.classList.add('button--accent-btn'); // de schimbat stilul
        queueBtn.textContent = 'REMOVE FROM QUEUE';
        film.push(movieData);
      }
      localStorage.setItem('queue', JSON.stringify(film));
    }
    isLocalStorageEmpty('queue');
  }
}

function isLocalStorageEmpty(name) {
  if (getFromStorage(name).length === 0) {
    if (refs.noFilmsMessage) {
        refs.noFilmsMessage.classList.remove('visually-hidden');
        //noFilmsMessage: document.querySelector('.alert__message'),
    }
    return;
  }
}

export { localStorageFunction };
