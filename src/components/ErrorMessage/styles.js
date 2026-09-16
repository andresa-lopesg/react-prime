import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

export const Message = styled.Text`
  margin-top: 16px;
  color: #fff;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 12px 28px;
  background-color: #e72f49;
  border-radius: 24px;
`;

export const RetryText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
