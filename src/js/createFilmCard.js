import { genres } from './fetchGenres';
import { openFilmModal } from './openFilmModal.js';

export async function createFilmCard(dataPromise) {
  const movieCard = document.querySelector('.movie-wrapper');
  const data = await dataPromise; // Așteaptă rezolvarea promisiunii cu datele

  movieCard.textContent = '';

  if (!data || !data.results) {
    console
      .error
      // 'Datele nu sunt disponibile sau nu au proprietatea "results".'
      ();
    return;
  }

  data.results.forEach(response => {
    // Crează un element nou pentru fiecare film/serial
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-wrapper__card');

    // Determină titlul: folosește 'name' pentru seriale și 'original_title' pentru filme
    let title = 'Unknown';
    if (response.media_type === 'tv') {
      title = response.name || response.original_name || 'Unknown';
    } else if (response.media_type === 'movie') {
      title = response.title || response.original_title || 'Unknown';
    }

    // Mapează ID-urile genurilor la numele lor, folosind lista de genuri încărcată
    const genreNames = response.genre_ids
      .map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : 'Unknown';
      })
      .filter(name => name !== 'Unknown')
      .join(', ');
    // console.log(genres);
    if (genreNames.includes('Unknown')) {
      console.log('ID-uri genuri necunoscute:', response.genre_ids);
      console.log('Lista de genuri disponibile:', genres);
    }

    // Determină anul de lansare
    let releaseYear = 'N/A';
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

    movieElement.addEventListener('click', () => openFilmModal(response));
    
    // Construiește HTML-ul pentru cardul filmului/serialului
    movieElement.innerHTML = `
      <div class="movie-wrapper__card-img">
        <img src="https://image.tmdb.org/t/p/w500${response.poster_path}" alt="${title}">
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
  });
}
