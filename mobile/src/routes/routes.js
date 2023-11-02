import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screens/Login"
import Main from "../screens/Main"

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  )
}
