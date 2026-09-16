import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";

import api, { key } from "@/services/api";

import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import SearchItem from "@/components/SearchItem";

function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, SetMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function getSearchMovies() {
      try {
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
          setError(false);
        }
      } catch {
        if (isActive) {
          setError(true);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    getSearchMovies();

    return () => {
      isActive = false;
    };
  }, [retry, route.params?.name]);

  function navigateDetailPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  function handleRetry() {
    setLoading(true);
    setRetry((count) => count + 1);
  }

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage
          message="Não foi possível buscar os filmes. Verifique sua conexão e a chave da API."
          onRetry={handleRetry}
        />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
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
