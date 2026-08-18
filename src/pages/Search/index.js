import { useEffect, useState } from "react";
import { Container, ListMovies } from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";

import api, { key } from "../../services/api";

import SearchItem from "../../components/SearchItem";
function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, SetMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function getSearchMovies() {
      const response = await api.get("/search/movie", {
        params: {
          query: route.params?.name,
          api_key: key,
          language: "pt-BR",
          page: 1,
        },
      });
      if (isActive) {
        SetMovie(response.data.results);
        setLoading(false);
      }
    }
    if (isActive) {
      getSearchMovies();
    }

    return () => {
      isActive = false;
    };
  }, []);

  function navigateDetailPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  if (loading) {
    return <Container></Container>;
  }
  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItem
            data={item}
            navigatePage={() => navigateDetailPage(item)}
          />
        )}
      />
    </Container>
  );
}
export default Search;
