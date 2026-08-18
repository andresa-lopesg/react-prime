import { Container, Name } from "./styles";

function Generes({ data }) {
  return (
    <Container>
      <Name>{data.name}</Name>
    </Container>
  );
}

export default Generes;
