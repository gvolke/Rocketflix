const API_KEY = 'api_key=0541c321000c3b2172bc9f1f7c71b0ca';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

function checkMovieExistence(movieId) {
    const url = BASE_URL + movieId + '?' + API_KEY

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('Erro ao verificar a existência do filme:', error);
            return false;
        });
}

function returnMovieData(movieId) {
    const url = BASE_URL + movieId + "?" + API_KEY + '&' + language
    return fetch(url)
            .then(response => response.json())
            .then(data => {
                const releaseDate = new Date(data.release_date)
                const movieGenre = []

                let genres = []
                genres.push(data.genres)
                
                for (var genre of genres) {
                    for (var i = 0; i < genre.length; i++) {
                        movieGenre.push(genre[i].name);
                    }
                }

                movieTitle.textContent = data.title
                movieYear.textContent = 'Ano: ' + releaseDate.getFullYear() 
                movieGenres.textContent = 'Gêneros: ' + movieGenre.join(', ')
                movieOverview.textContent = data.overview
                movieImage.src = IMG_URL + data.poster_path
            })
            .catch(err => console.log(err))  
}

async function getMovie() { 
    movieImage.height = 243.773
    movieImage.width = 171

    let id = Math.floor(Math.random() * 1000) + 1;  

    while (!(await checkMovieExistence(id))) {
        id = Math.floor(Math.random() * 10000); 
    }

    await returnMovieData(id) 
}
