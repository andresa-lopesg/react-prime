export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0; i < size; i++) {
    // Adiciona uma verificação simples caso o array 'movies' seja menor que 'size'
    if (movies[i]) {
      popularMovies.push(movies[i]);
    }
  }

  return popularMovies;
}
