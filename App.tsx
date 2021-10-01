import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Explore from './screens/explore/Explore';
import Profile from './screens/profile/Profile';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Conversation from './screens/conversation/Conversation';
import Activity from './screens/Activity/Activity';
import UserDetails from './screens/UserDetails/UserDetails';
import CreatePost from './screens/CreatePost/CreatePost';
import { getData } from './helpers/async-storage';
import SinglePost from './screens/SinglePost/SinglePost';
import AppLoading from "expo-app-loading";
import io from 'socket.io-client';
import { socketUrl } from './helpers/apiUrl';

const sock = io(socketUrl, {
  transports: ['websocket'],
  forceNew: true,
});


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
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
              else if (route.name === 'activity') {
                iconName = focused ? 'play-circle-sharp' : 'play-circle-outline';
              }
              // You can return any component that you like here!
              // @ts-ignore
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#1E3A8A',
            inactiveTintColor: '#6B7280',
            labelStyle: {
              fontSize: 13
            },
            style: {
              height: 60
            }
          }}
        >
          <Tab.Screen name="chats" component={Home} />
          <Tab.Screen name="activity" component={Activity} />
          <Tab.Screen name="explore" component={Explore} />
          <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
      </Provider>
    </SafeAreaProvider>
  );
}


const App = () => {

  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sock.on('login-success', (data) => {
      getData().then((res) => {
        if (data === 'sucessfully logged in') {
          setUser(res)
        }
        setLoading(false)
      }).catch(error => {
        console.log(error)
      })
    })
    sock.on('logout-success', (data) => {
      if (data === 'sucessfully logged out') {
        setUser(null)
      }
    })
  }, [])

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <AppLoading />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!user ? (
              <>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name="home" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="conversation" component={Conversation} options={{ headerShown: false }} />
                <Stack.Screen name="details" component={UserDetails} options={{ headerShown: false }} />
                <Stack.Screen name="createpost" component={CreatePost} options={{ headerShown: false }} />
                <Stack.Screen name="singlepost" component={SinglePost} options={{ headerShown: false }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})
