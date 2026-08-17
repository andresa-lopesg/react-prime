import AsyncStorage from "@react-native-async-storage/async-storage";

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
    console.log("Esse filme ja eite na sua lista");
    return;
  }

  moviesStored.push(newMovie);
  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  console.log("filme salvo com sucesso!");
}
//Deletar
export async function deleteMovie(id) {
  let moviesStored = await getMovieSave("@primereact");

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem("@primereact", JSON.stringify(myMovies));
  console.log("filme deletado com sucesso");
  return myMovies;
}

// Filtrar filmes ja salvos
export async function hasMovie(movie) {
  let moviesStored = await getMovieSave("@primereact");

  const hasmovie = moviesStored.find((item) => item.id === movie.id);

  if (hasmovie) {
    return true;
  }
  return false;
}
