import { Linking, Modal, Platform, ScrollView } from "react-native";

import {
  Banner,
  ButtonLink,
  Container,
  ContentArea,
  Description,
  Header,
  HeaderButton,
  ListGenres,
  Rate,
  Title,
} from "./styles";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Stars from "react-native-stars";
import api, { key } from "@/services/api";

import ErrorMessage from "@/components/ErrorMessage";
import Genres from "@/components/Genres";
import Loading from "@/components/Loading";
import ModalLink from "@/components/ModalLink";
import Toast from "@/components/Toast";
import { deleteMovie, hasMovie, saveMovie } from "@/utils/storage";

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      try {
        const response = await api.get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        });

        if (isActive) {
          setMovie(response.data);
          setError(false);

          const isFavorite = await hasMovie(response.data);
          setFavoritedMovie(isFavorite);
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

    getMovie();

    return () => {
      isActive = false;
    };
  }, [retry, route.params?.id]);

  const hideToast = useCallback(() => setToast(""), []);

  async function handlefavoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
      setToast("Filme removido da sua lista");
      return;
    }

    await saveMovie(movie);
    setFavoritedMovie(true);
    setToast("Filme salvo na sua lista");
  }

  function handleRetry() {
    setLoading(true);
    setRetry((count) => count + 1);
  }

  function handleOpenLink() {
    if (!movie.homepage) {
      setToast("Esse filme não tem site oficial");
      return;
    }

    if (Platform.OS === "web") {
      Linking.openURL(movie.homepage);
      return;
    }

    setOpenLink(true);
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
        <Header style={{ top: insets.top + 8 }}>
          <HeaderButton
            accessibilityLabel="Voltar"
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={28} color="#FFF" />
          </HeaderButton>
        </Header>

        <ErrorMessage
          message="Não foi possível carregar os detalhes do filme. Verifique sua conexão e a chave da API."
          onRetry={handleRetry}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header style={{ top: insets.top + 8 }}>
        <HeaderButton
          accessibilityLabel="Voltar"
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={28} color="#FFF" />
        </HeaderButton>
        <HeaderButton
          accessibilityLabel={
            favoritedMovie ? "Remover da minha lista" : "Salvar na minha lista"
          }
          onPress={() => handlefavoriteMovie(movie)}
        >
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

      <ButtonLink
        accessibilityLabel="Abrir o site oficial do filme"
        onPress={handleOpenLink}
      >
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

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
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

      {toast ? <Toast message={toast} onHide={hideToast} /> : null}
    </Container>
  );
}

export default Detail;
