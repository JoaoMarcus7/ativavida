import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './Pages/LoginScreen';
import CadastroScreen from './Pages/CadastroScreen';
import ProfileScreen from './Pages/ProfileScreen';
import HomeScreen from './Pages/HomeScreen';
import AlimentationScreen from './Pages/AlimentationScreen';
import ExerciseScreen from './Pages/ExerciseScreen';
import HydrationScreen from './Pages/HydrationScreen';
import TimeOutScreen from './Pages/TimeOutScreen';
import ConsumedScreen from './Pages/ConsumedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alimentation" component={AlimentationScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
          <Stack.Screen name="Hydration" component={HydrationScreen} />
          <Stack.Screen name="TimeOut" component={TimeOutScreen} />
          <Stack.Screen name="Consumed" component={ConsumedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}