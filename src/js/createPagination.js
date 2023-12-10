//FT-08 Creează sau conectează numerele paginilor (paginare)
//pe pagina principală
// (numerele de pagini pe care poti selecta + sagetile),
// puteti folosi libraria fontawesome pentru sageti (sau orice
// alta librarie)

import { fetchMovies } from './js/fetchMovies.js';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


export  function paginationFunc() {
  const createContainer = document.createElement('DIV');
  createContainer.id = 'pagination';
  document.body.appendChild(createContainer);
  const container = document.getElementById('pagination');
  const options = {
    // below default value of options
    totalItems: 10,
    itemsPerPage: 9,
    visiblePages: 10,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);
  console.dir(pagination);
  
  fetchMovies(pagination.getCurrentPage());
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchMovies(currentPage);
  });
}

