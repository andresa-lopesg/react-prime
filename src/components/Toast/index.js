import { useEffect, useState } from "react";
import { Animated } from "react-native";

import { Container, Message } from "./styles";

function Toast({ message, onHide }) {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(onHide);
    }, 2200);

    return () => clearTimeout(timer);
  }, [message, onHide, opacity]);

  return (
    <Container style={{ opacity }} pointerEvents="none">
      <Message>{message}</Message>
    </Container>
  );
}

export default Toast;
