import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Explore from './screens/explore/Explore';
import Profile from './screens/profile/Profile';
import Conversation from './screens/conversation/Conversation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'chats') {
              iconName = focused
                ? 'chatbubble-ellipses-sharp'
                : 'chatbubble-ellipses-outline';
            } else if (route.name === 'explore') {
              iconName = focused ? 'earth' : 'md-earth-outline';
            }
            else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#5B61B9',
          inactiveTintColor: '#6B7280',
          labelStyle:{
            fontSize: 13
          },
          style:{
            height: 60
          }
        }}
      >
      <Tab.Screen name="chats" component={Home} />
      <Tab.Screen name="explore" component={Explore} />
      <Tab.Screen name="profile" component={Profile} />
      {/* <Tab.Screen name="explore" component={Explore} />
      <Tab.Screen name="profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="chats" component={HomeTabs} options={{headerShown: false}} />
        <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="conversation" component={Conversation} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
