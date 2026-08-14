import { Container, Name } from "./style";

function Generes({ data }) {
  return (
    <Container>
      <Name>{data.name}</Name>
    </Container>
  );
}

export default Generes;
