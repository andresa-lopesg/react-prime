import { ActivityIndicator, ScrollView } from "react-native";

import {
  Attribution,
  Banner,
  BannerButton,
  Container,
  Input,
  SearchButton,
  SearchContainer,
  SliderMovie,
  Title,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import { useNavigation } from "@react-navigation/native";
import api, { key } from "../../services/api";
import { getListMovies, randomBanner } from "../../utils/movie";

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      try {
        const [nowData, popularData, topData] = await Promise.all([
          api.get("/movie/now_playing", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
          api.get("/movie/popular", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
          api.get("/movie/top_rated", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
        ]);

        if (isActive) {
          const nowList = getListMovies(15, nowData.data.results);
          const popularList = getListMovies(10, popularData.data.results);
          const topList = getListMovies(5, topData.data.results);

          setBannerMovie(
            nowData.data.results[randomBanner(nowData.data.results)],
          );

          setNowMovies(nowList);
          setPopularMovies(popularList);
          setTopMovies(topList);
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

    getMovies();

    return () => {
      isActive = false;
    };
  }, [retry]);

  function navigateDetailsPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  function handleRetry() {
    setLoading(true);
    setRetry((count) => count + 1);
  }

  function handleSearchMovie() {
    if (input === "") return;

    navigation.navigate("Search", { name: input });
    setInput("");
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage
          message="Não foi possível carregar os filmes. Verifique sua conexão e a chave da API."
          onRetry={handleRetry}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React. Prime" />

      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>

        <BannerButton
          activeOpacity={0.9}
          onPress={() => navigateDetailsPage(bannerMovie)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`,
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Attribution>
          Dados fornecidos pelo TMDB. Este app não é endossado nem certificado
          pelo TMDB.
        </Attribution>
      </ScrollView>
    </Container>
  );
}

export default Home;
