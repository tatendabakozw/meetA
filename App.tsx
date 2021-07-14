import React, { useEffect } from 'react'
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
import { LogBox } from 'react-native';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateProvider, useStateValue } from './StateContext/StateProvider';
import reducer, { initialState } from './StateContext/reducer';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface Props{
  navigation : any
}

function HomeTabs({navigation}:Props) {

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
    </Tab.Navigator>
  );
}


const App = ({navigation}:Props) => {

  //function to store data locally
  const storeData = async (value:any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@current_user', jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
  }
  
  //check if user is already logged in
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(auth_user=>{
        if(auth_user){
            navigation.navigate('chats')
            storeData(auth_user)
        }
    })
    return unsubscribe
  },[])

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="conversation" component={Conversation} options={{headerShown: false}} />
          <Stack.Screen name="chats" component={HomeTabs} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
   </StateProvider>
  )
}

export default App

const styles = StyleSheet.create({})
