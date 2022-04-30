let page = 1;
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0c0c6066b56718e8bc3b54cfff7f2b41&page=${page}`;

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=0c0c6066b56718e8bc3b54cfff7f2b41&query="`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

//Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
  console.log(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    
    <img src="${IMG_PATH + poster_path}"
        alt="${title}">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h2>${title}</h2> 
      <h3>Released: ${release_date}</h3>      
        ${overview} 
    </div> 
`;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});

next.addEventListener('click', () => {
  page++;
  getMovies(API_URL + page);
  console.log(API_URL + page);
  update();
  getMovies(`${API_URL}&page=${page}`);
});

previous.addEventListener('click', () => {
  // when page is 0, then button should be disabled
  page--;
  getMovies(API_URL + page);
  console.log(API_URL + page);
  if (page <= 1) {
    page = 1;
  }
  update();

  getMovies(`${API_URL}&page=${page}`);
});

function update() {
  if (page === 1) {
    previous.disabled = true;
  } else {
    previous.disabled = false;
    next.disabled = false;
  }
}
