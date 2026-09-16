import { Feather } from "@expo/vector-icons";

import { Container, Message, RetryButton, RetryText } from "./styles";

function ErrorMessage({ message, onRetry }) {
  return (
    <Container>
      <Feather name="alert-circle" size={44} color="#e72f49" />

      <Message>{message}</Message>

      <RetryButton activeOpacity={0.7} onPress={onRetry}>
        <RetryText>Tentar novamente</RetryText>
      </RetryButton>
    </Container>
  );
}

export default ErrorMessage;
