import { ActivityIndicator } from "react-native";

import { Container } from "./styles";

function Loading() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  );
}

export default Loading;
