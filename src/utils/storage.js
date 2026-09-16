import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave usada para guardar a lista de filmes favoritos
const MOVIES_KEY = "@primereact";

export async function getMovieSave() {
  const myMovies = await AsyncStorage.getItem(MOVIES_KEY);

  return JSON.parse(myMovies) || [];
}

export async function saveMovie(newMovie) {
  const moviesStored = await getMovieSave();
  const alreadySaved = moviesStored.some((item) => item.id === newMovie.id);

  if (alreadySaved) {
    return;
  }

  moviesStored.push(newMovie);
  await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(moviesStored));
}

export async function deleteMovie(id) {
  const moviesStored = await getMovieSave();
  const myMovies = moviesStored.filter((item) => item.id !== id);

  await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(myMovies));

  return myMovies;
}

export async function hasMovie(movie) {
  const moviesStored = await getMovieSave();

  return moviesStored.some((item) => item.id === movie.id);
}
