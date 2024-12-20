import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import BooksScreen from './screens/Books';
import BooksByDisciplineScreen from './screens/BooksByDisciplineScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Buscas">
        <Stack.Screen name="Buscas" component={HomeScreen} />
        <Stack.Screen name="Lista de Livros" component={BooksScreen} />
        <Stack.Screen
          name="BooksByDiscipline"
          component={BooksByDisciplineScreen}
          options={{ title: 'Livros por Disciplina' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;