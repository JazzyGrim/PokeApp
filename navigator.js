import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import PokemonScreen from './components/PokemonScreen';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
            name="Pokemon"
            component={PokemonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;