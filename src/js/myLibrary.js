import { getFromStorage } from './setGetLocalStorage';
import { openFilmModal } from './openFilmModal';

function handleLibraryOrQueueClick(event) {
  event.preventDefault();

  const watched = document.querySelector('.watched');
  const movie = document.querySelector('.movie');
  const paginationContainer = document.getElementById('pagination-container');
  const headerSearchForm = document.querySelector('.search-form');
  const watchedQueueContainers = document.querySelectorAll(
    '.watched-queue-container'
  );
  const siteNavButtons = document.querySelectorAll('.site-nav-button');
  const myLibraryBtn = document.querySelector('.site-nav-item.my-library-btn');

  // Goleste conținutul acestor elemente
  if (watched) watched.innerHTML = '';
  if (movie) movie.innerHTML = '';
  if (paginationContainer) paginationContainer.style.display = 'none';
  if (headerSearchForm) headerSearchForm.style.display = 'none';
  if (myLibraryBtn) myLibraryBtn.style.display = 'none';
  watchedQueueContainers.forEach(
    container => (container.style.display = 'flex')
  );
  siteNavButtons.forEach(button => (button.style.display = 'flex'));

  const queueDiv = document.querySelector('.queue');
  if (queueDiv) {
    queueDiv.innerHTML = '';
    queueDiv.style.display = 'grid';
    movie.style.display = 'none';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const filmObject = getFromStorage(key);
      if (filmObject && filmObject.html) {
        queueDiv.innerHTML += filmObject.html; // Folosiți partea HTML pentru afișare
      }
    }

    document
      .querySelector('.queue')
      .addEventListener('click', function (event) {
        const clickedCard = event.target.closest('.movie-wrapper__card');
        if (clickedCard) {
          const filmId = clickedCard.getAttribute('data-filmid');
          const filmObject = getFromStorage(filmId);
          if (filmObject && filmObject.data) {
            openFilmModal(filmObject.data, filmObject.html);
          } else {
            console.error('Obiectul film nu a fost găsit sau nu conține date.');
          }
        }
      });
  }

  // Setează înălțimea minimă pentru containerul principal
  let headerHeight = 0;
  let footerHeight = 0;
  const header = document.querySelector('header');
  if (header) headerHeight = header.offsetHeight;
  const footer = document.querySelector('footer');
  if (footer) footerHeight = footer.offsetHeight;
  const windowHeight = window.innerHeight;
  const minHeight = windowHeight - headerHeight - footerHeight;
  if (movie) movie.style.minHeight = `${minHeight}px`;
}
//------------------------------------------------------------------------------
function handleWatchedClick(event) {
  event.preventDefault();

  const watched = document.querySelector('.watched');
  const movie = document.querySelector('.movie');
  const queue = document.querySelector('.queue');

  // Golește conținutul din movie și queue
  if (movie) movie.innerHTML = '';
  if (queue) queue.innerHTML = '';

  // Manipulează și afișează conținutul pentru watched
  // De exemplu, poți popula conținutul din localStorage sau o altă sursă
  if (watched) {
    // Codul pentru popularea containerului watched
    watched.innerHTML = 'Conținut pentru Watched...';
  }
}
export function setupMyLibraryLink() {
  const myLibraryLink = document.querySelector('a[data-request="library"]');
  const queueLink = document.querySelector('a[data-request="queue"]');
  const watchedLink = document.querySelector('a[data-request="watched"]');

  if (myLibraryLink)
    myLibraryLink.addEventListener('click', handleLibraryOrQueueClick);
  if (queueLink) queueLink.addEventListener('click', handleLibraryOrQueueClick);
  if (watchedLink) watchedLink.addEventListener('click', handleWatchedClick);
}
// -----------------------------------------------------------------------------
