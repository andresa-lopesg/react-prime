import { Feather, Ionicons } from "@expo/vector-icons";
import {
  ActionContainer,
  Container,
  DeleteButton,
  DetailButton,
  Rate,
  RateContainer,
  Title,
} from "./style";

function FavoriteItem({ data, handleDelete, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data.title}</Title>

      <RateContainer>
        <Ionicons name="star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigatePage(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => handleDelete(data.id)}>
          <Feather name="trash" size={24} color="#FFFF" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default FavoriteItem;
