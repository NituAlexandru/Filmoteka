import { getFromStorage } from './setGetLocalStorage';
import { openFilmModal } from './openFilmModal';

export function setupMyLibraryLink() {
  const myLibraryLink = document.querySelector('a[data-request="library"]');

  if (myLibraryLink) {
    myLibraryLink.addEventListener('click', event => {
      event.preventDefault();

      // selecteaza elementele care se vor goli
      const watched = document.querySelector('.watched');
      const movie = document.querySelector('.movie');
      const paginationContainer = document.getElementById(
        'pagination-container'
      );
      const headerSearchForm = document.querySelector('.search-form');
      const watchedQueueContainers = document.querySelectorAll(
        '.watched-queue-container'
      );
      const siteNavButtons = document.querySelectorAll('.site-nav-button');
      const myLibraryBtn = document.querySelector(
        '.site-nav-item.my-library-btn'
      );

      // goleste conținutul acestor elemente
      if (watched) watched.innerHTML = '';
      if (movie) movie.innerHTML = '';
      if (paginationContainer) {
        paginationContainer.style.display = 'none';
      }
      if (headerSearchForm) {
        headerSearchForm.style.display = 'none';
      }
      if (myLibraryBtn) {
        myLibraryBtn.style.display = 'none';
      }
      watchedQueueContainers.forEach(container => {
        container.style.display = 'flex';
      });
      siteNavButtons.forEach(button => {
        button.style.display = 'flex';
      });

      const queueDiv = document.querySelector('.queue');
      if (queueDiv) {
        queueDiv.innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const filmObject = getFromStorage(key);

          if (filmObject && filmObject.html) {
            queueDiv.innerHTML += filmObject.html; // Folosiți partea HTML pentru afișare
          }
        }
      }

      // Adauga event listener-ul pentru click-uri pe carduri în "queue"
      document
        .querySelector('.queue')
        .addEventListener('click', function (event) {
          const clickedCard = event.target.closest('.movie-wrapper__card');
          console.log('Clicked card:', clickedCard); // Verificați elementul cardului

          if (clickedCard) {
            const filmId = clickedCard.getAttribute('data-filmid'); // Sau folosiți dataset dacă este mai convenabil
            console.log('Film ID:', filmId); // Verificați dacă ID-ul este extras corect

            const filmObject = JSON.parse(localStorage.getItem(filmId));
            console.log('Film object from storage:', filmObject); // Verificați obiectul extras

            if (filmObject && filmObject.data) {
              console.log('Film data:', filmObject.data); // Verificați datele filmului
              openFilmModal(filmObject.data, filmObject.html);
            } else {
              console.error(
                'Obiectul film nu a fost găsit sau nu conține date.'
              );
            }
          }
        });

      function addFilmToQueue(filmData) {
        // În interiorul unui event listener pentru butonul "Add to Queue"
        addToQueue({
          id: filmData.id,
          cardHtml: cardHtml, // Asigurați-vă că aveți HTML-ul cardului aici
          data: filmData, // Datele complete ale filmului
        });
      }
      // ----------------------------------------------------------------------------

      // Setează înălțimea minimă pentru containerul principal
      let headerHeight = 0;
      let footerHeight = 0;
      // Verifica dacă elementul header există și obtine înălțimea
      const header = document.querySelector('header');
      if (header) {
        headerHeight = header.offsetHeight;
      }
      // Verifica dacă elementul footer există și obtine înălțimea
      const footer = document.querySelector('footer');
      if (footer) {
        footerHeight = footer.offsetHeight;
      }
      const windowHeight = window.innerHeight;
      const minHeight = windowHeight - headerHeight - footerHeight;
      if (movie) {
        movie.style.minHeight = `${minHeight}px`;
      }
    });
  }
}
