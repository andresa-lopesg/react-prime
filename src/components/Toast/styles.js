import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 40px;
  padding: 14px 18px;
  background-color: #191a30;
  border-radius: 8px;
`;

export const Message = styled.Text`
  color: #fff;
  font-size: 15px;
  text-align: center;
`;
