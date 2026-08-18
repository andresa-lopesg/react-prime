import { Modal, ScrollView } from "react-native";

import {
  Banner,
  ButtonLink,
  Container,
  ContentArea,
  Description,
  Header,
  HeaderButton,
  ListGeneres,
  Rate,
  Title,
} from "./styles";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Stars from "react-native-stars";
import api, { key } from "../../services/api";

import Generes from "../../components/Generes";
import ModalLink from "../../components/ModalLink";
import { deleteMovie, hasMovie, saveMovie } from "../../utils/storage";

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: "pt-BR",
        },
      });

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data);
        setFavoritedMovie(isFavorite);
      }
    }
    if (isActive) {
      getMovie();
    }
    return () => {
      isActive = false;
    };
  }, []);

  async function handlefavoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
      alert("Filme removido da sua lista");
      return;
    }

    await saveMovie("@primereact", movie);
    setFavoritedMovie(true);
    alert("Filme salvo na sua lista");
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#FFF" />
        </HeaderButton>
        <HeaderButton onPress={() => handlefavoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons name="bookmark" size={28} color="#FFF" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#FFF" />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={24} color="#FFF" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="star" size={24} color="#E7a74e" />}
          emptyStar={<Ionicons name="star-outline" size={24} color="#e7a74e" />}
          halfStar={<Ionicons name="star-half" size={24} color="#e7a74e" />}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGeneres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Generes data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Detail;
