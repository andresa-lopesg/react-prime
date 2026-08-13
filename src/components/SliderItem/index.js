import { Ionicons } from "@expo/vector-icons";

import { BannerItem, Container, Rate, RateContainer, Title } from "./style";

function SliderItem({ data }) {
  return (
    <Container>
      <BannerItem
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        }}
      />

      <Title numberOfLines={1}>{data.title}</Title>

      <RateContainer>
        <Ionicons name="star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SliderItem;
