import { genres } from './fetchGenres';

export async function createFilmCard(dataPromise) {
  const movieCard = document.querySelector('.movie-wrapper');
  const data = await dataPromise; // Așteaptă rezolvarea promisiunii cu datele

  movieCard.textContent = '';

  if (!data || !data.results) {
    // console.error('Datele nu sunt disponibile sau nu au proprietatea "results".');
    return;
  }

  data.results.forEach(response => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-wrapper__card');
    const releaseYear = response.release_date
      ? response.release_date.split('-')[0]
      : 'N/A';
    const rating = typeof response.vote_average === 'number' ? response.vote_average : 'N/A'; // Presupunând că nota filmului este în response.vote_average
    const genreNames = response.genre_ids
      .map(id => genres.find(genre => genre.id === id)?.name || 'Unknown')
      .join(', ');
    movieElement.innerHTML = `
        
        <div class="movie-wrapper__card-img">
          <img src="https://image.tmdb.org/t/p/w500${
            response.poster_path
          }" alt="${response.title}">
        </div>
        <div class="movie-wrapper__footer">
          <div class="movie-wrapper__title">
            ${response.title}
          </div>
          <div class="movie-wrapper__info">
            <p class="movie-wrapper__info-genres">${genreNames} </p>
            <span class="movie-wrapper__info-year">| ${releaseYear}</span>
            <span class="movie-wrapper__info-rating"> ${rating.toFixed(
              2
            )}</span>
          </div>
        </div>        
        `;

    movieCard.append(movieElement);
  });
}
