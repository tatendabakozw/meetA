import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/home/Home';

const Stack = createStackNavigator()

const globalScreenOptions = {}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="register" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
