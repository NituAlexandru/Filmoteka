// FT-05 Creează șablonul unui card de film - functie
// FT-06 Creează containerul paginii principale pentru poziționarea

export function createFilmCard(data) {
    const moiveCard = document.querySelector('.movie-wrapper');

    moiveCard.textContent = '';

    data.results.forEach((response) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-wrapper__card');
        const releaseYear = response.release_date ? response.release_date.split('-')[0] : '2013';

        movieElement.innerHTML = `
        
        <div class="movie-wrapper__card-img">
          <img src="https://image.tmdb.org/t/p/w500${response.poster_path}" alt=${response.title}>
        </div>
        <div class="movie-wrapper__footer">
          <div class="movie-wrapper__title">
            ${response.title}
          </div>
          <div class="movie-wrapper__info">
            <p class="movie-wrapper__info-genres">${response.genre_ids.join(', ')} </p>
            <p class="movie-wrapper__info-yaer">| ${releaseYear}</p>
          </div>
        </div>        
        `

        moiveCard.append(movieElement)
    })
}

