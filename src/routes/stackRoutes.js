import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Search from "../Search/indext";

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          title: "Detalhes",
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Sua busca",
          headerTintColor: "#FFF",

          headerTitleStyle: {
            color: "#FFF",
          },

          headerStyle: {
            backgroundColor: "#0b0b32",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
