const API_KEY = process.env.TMDB_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function waitSomeTime(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchFromTmdb(url) {
  let lastError = null;

  for(let attempt = 1; attempt <= 3; attempt++){
    try{
      const response = await fetch(url, {
        next:{
          revalidate:3600
        }
      });

      if(!response.ok){
        throw new Error("TMDB request failed");
      }

      return response.json();
    }
    catch(error){
      lastError = error;
      await waitSomeTime(500);
    }
  }

  throw lastError;
}


export async function getPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

  return fetchFromTmdb(url);
}

export async function getMovieDetails(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

  return fetchFromTmdb(url);
}
export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  return fetchFromTmdb(url);
}
export async function getGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

  return fetchFromTmdb(url);
}