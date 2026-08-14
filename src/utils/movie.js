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

//Gerar numero aleatorio com base no tamanho da lsita de fislmes que eu passar
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
