import { Ionicons } from "@expo/vector-icons";
import { Banner, Container, Rate, RateContainer, Title } from "./styles";

function SearchItem({ data, navigatePage }) {
  function detailMovie() {
    if (data.release_date === "") {
      alert("Filme ainda sem data");
      return;
    }
    navigatePage(data);
  }
  return (
    <Container activeOpacity={0.7} onPress={detailMovie}>
      {data?.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
          }}
        />
      ) : (
        <Banner resizeMethod="resize" />
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Ionicons name="star" size={12} color="#e7a74e" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SearchItem;
