import {
  useIsFocused,
  useNavigation
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import FavoriteItem from "../../components/FavoriteItem";
import Header from "../../components/Header";
import { deleteMovie, getMovieSave } from "../../utils/storage";
import { Container, ListMovies } from "./styles";

function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMovieSave("@primereact");

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }
    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateDeailPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  return (
    <Container>
      <Header title="Meus Filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            handleDelete={handleDelete}
            navigatePage={() => navigateDeailPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movies;
