const API_HOST = "http://localhost:3000/api";
const movies = [
  { id: "fake-id-1", name: "Blade Runner" },
  { id: "fake-id-2", name: "2001: A Space Odyssey" },
  { id: "fake-id-3", name: "The Matrix" },
  { id: "fake-id-4", name: "Inception" },
  { id: "fake-id-5", name: "Interstellar" },
];
let quantity_history = movies.length;

async function getMoviesApi() {
  return movies;
}

async function addMovieApi({ name }) {
  quantity_history++;
  const newMovie = { id: `fake-id-${quantity_history}`, name };
  movies.push(newMovie);
  return newMovie;
}

async function updateMovieApi({ id, name }) {
  const movie = movies.find((movie) => movie.id === id);
  movie.name = name;
  return movie;
}

async function deleteMovieApi({ id }) {
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  movies.splice(movieIndex, 1);
}
