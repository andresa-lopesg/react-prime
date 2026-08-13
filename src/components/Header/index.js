import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { Container, MenuButton, Title } from "./style";

function Header({ title }) {
  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={36} color="#fff" />
      </MenuButton>

      <Title>{title}</Title>
    </Container>
  );
}

export default Header;
