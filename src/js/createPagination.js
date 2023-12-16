import { createFilmCard } from './createFilmCard.js';
import { fetchMovies } from './fetchMovies.js';

const totalPagesToShow = 6; // Modificare la 6 pagini afișate
let currentPage = 1;
let prevPageSet = 4;

// Funcția pentru afișarea filmelor cu paginare
export function createPagination(movies, searchQuery) {
  createFilmCard(movies).then(res => {
    try {
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
          const prevPage = Math.max(1, currentPage - totalPagesToShow + 1);

          if (prevPage !== currentPage) {
            currentPage = prevPage;
            const moviesByPage = await fetchMovies(searchQuery, prevPage);
            createPagination(moviesByPage, searchQuery);
          }
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

          pageLink.addEventListener('click', async event => {
            try {
              const moviesByPage = await fetchMovies(searchQuery, i);

              // Găsește pagina activă folosind funcția separată
              const activePageItem = findActivePage(
                paginationContainer,
                event.target
              );

              // Elimină clasa "active" de la toate paginile
              document
                .querySelectorAll('.pagination .page-item')
                .forEach(item => {
                  item.classList.remove('active');
                });

              // Adaugă clasa "active" doar pentru pagina curentă
              if (activePageItem) {
                activePageItem.classList.add('active');
              }

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
            currentPage + totalPagesToShow
          );

          currentPage = nextSetPage;
          const moviesByPage = await fetchMovies(searchQuery, nextSetPage);
          createPagination(moviesByPage, searchQuery);
        });

        nextPageSetItem.appendChild(nextPageSetLink);
        pageList.appendChild(nextPageSetItem);

        pagination.appendChild(pageList);
        paginationContainer.appendChild(pagination);
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function findActivePage(container, target) {
  return target.closest('.page-item');
}
