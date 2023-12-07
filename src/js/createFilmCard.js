// FT-05 Creează șablonul unui card de film - functie
// FT-06 Creează containerul paginii principale pentru poziționarea
// corectă a cardurilor de film (mobile, tablet, desktop) 

const API_KEY = 'a5406dd14816b26728050ce2e3dfdd5f';
const API_URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';


function getMovie() {
    fetch(`${API_URL}&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
       createFilmCard(data)
    })
}


function createFilmCard(data) {
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

getMovie()
