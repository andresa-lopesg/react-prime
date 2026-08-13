import { ScrollView } from "react-native";

import {
  Banner,
  BannerButton,
  Container,
  Input,
  SearchButton,
  SearchContainer,
  Title,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { SliderMovie } from "../../components/Header/style";
import SliderItem from "../../components/SliderItem";

import api, { key } from "../../services/api";
import { getListMovies } from "../../utils/movie";

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopulaMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      //const response = await api.get("movie/now_playing", {
      //params: {
      // api_key: key,
      //language: "pt-BR",
      //page: 1,
      //  },
      //});

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

      const nowList = getListMovies(10, nowData.data.results);
      const popularList = getListMovies(5, popularData.data.results);
      const topList = getListMovies(5, topData.data.results);

      setNowMovies(nowList);
      setPopulaMovies(popularList);
      setTopMovies(topList);
    }

    getMovies();
  }, []);
  return (
    <Container>
      <Header title="React. Prime" />

      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#ddd" />

        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>

        <BannerButton activeOpacity={0.9} onPress={() => alert("TESTE")}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Poupulares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
