import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave usada para guardar a lista de filmes favoritos
export const MOVIES_KEY = "@primereact";

//Buscar filmes salvos
export async function getMovieSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}
// Salvar um novo filme
export async function saveMovie(key, newMovie) {
  let moviesStored = await getMovieSave(key);

  // Se tiver algum filme salvo com mesmo id
  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    return;
  }

  moviesStored.push(newMovie);
  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}
//Deletar
export async function deleteMovie(id) {
  let moviesStored = await getMovieSave(MOVIES_KEY);

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(myMovies));
  return myMovies;
}

// Filtrar filmes ja salvos
export async function hasMovie(movie) {
  let moviesStored = await getMovieSave(MOVIES_KEY);

  const hasmovie = moviesStored.find((item) => item.id === movie.id);

  if (hasmovie) {
    return true;
  }
  return false;
}
