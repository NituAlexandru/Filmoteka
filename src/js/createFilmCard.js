import { genres } from './fetchGenres';
import { openFilmModal } from './openFilmModal.js';

export async function createFilmCard(dataPromise) {
  const movieCard = document.querySelector('.movie-wrapper');
  const data = await dataPromise; // Așteaptă rezolvarea promisiunii cu datele

  movieCard.textContent = '';

  if (!data || !data.results) {
    console.error(
      'Datele nu sunt disponibile sau nu au proprietatea "results".'
    );
    return;
  }

  data.results.forEach(response => {
    // Crează un element nou pentru fiecare film/serial
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-wrapper__card');

    // Determină titlul: folosește 'name' pentru seriale și 'original_title' pentru filme
    let title = response.title || response.name || 'Unknown Title';

   if (response.media_type === 'tv') {
  title = response.original_name || response.name || response.title || 'Unknown Title';
} else if (response.media_type === 'movie') {
  title = response.original_title || response.title || 'Unknown Title';
}

    // Mapează ID-urile genurilor la numele lor, folosind lista de genuri încărcată
    const genreNames = response.genre_ids
      .map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(name => name !== null)
      .join(', ');
    //  console.log(genres);
    if (genreNames.includes('Unknown')) {
      console.log('ID-uri genuri necunoscute:', response.genre_ids);
      console.log('Lista de genuri disponibile:', genres);
    }

    // Determină anul de lansare
    let releaseYear = response.release_date?.split('-')[0] || 'N/A';
    if (response.media_type === 'movie' && response.release_date) {
      releaseYear = response.release_date.split('-')[0];
    } else if (response.media_type === 'tv' && response.first_air_date) {
      releaseYear = response.first_air_date.split('-')[0];
    }

    // Formatează rating-ul pentru a afișa doar două zecimale
    const rating =
      typeof response.vote_average === 'number'
        ? response.vote_average.toFixed(2)
        : 'N/A';

    const posterPath = response.poster_path
      ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
      : 'path/to/default/image.jpg';

    movieElement.addEventListener('click', () => openFilmModal(response));

    // Construiește HTML-ul pentru cardul filmului/serialului
    movieElement.innerHTML = `
      <div class="movie-wrapper__card-img">
        <img src="${posterPath}" alt="${title}">
      <span class="movie-wrapper__info-rating">${rating}</span>
        </div>
      <div class="movie-wrapper__footer">
        <div class="movie-wrapper__title">${title}</div>
        <div class="movie-wrapper__info">
          <p class="movie-wrapper__info-genres">${genreNames}</p>
          <span class="movie-wrapper__info-year"> | ${releaseYear}</span>
          
        </div>
      </div>`;

    // Adaugă elementul creat în containerul principal
    movieCard.append(movieElement);

    movieElement.addEventListener('click', () => {
      const existingModal = document.querySelector('.film-modal');
      if (existingModal) {
        existingModal.remove();
      }
      openFilmModal(response);

      // După deschiderea ferestrei modale, atașăm evenimente butoanelor
      setTimeout(() => {
        const setToWatchedBtn = document.getElementById('setToWatchedBtn');
        const setToQueueBtn = document.getElementById('setToQueueBtn');

        const modal = document.querySelector('.film-modal');
        const modalContent = document.querySelector('.film-modal-content');
        modal.addEventListener('click', event => {
          if (event.target === modal || event.target === modalContent) {
            modal.remove();
          }
        });
      }, 0);
    });
  });
}
