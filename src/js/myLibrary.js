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
        // Adăugați conținutul dorit în div-ul queue
        queueDiv.innerHTML = 'Conținutul dorit aici'; // înlocuiți cu conținutul real
      
      
      
      
      }

      // ------------------------------------------------------------

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
