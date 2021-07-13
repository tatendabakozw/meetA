import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/home/Home';
import { NativeRouter, Route, Switch, useHistory } from "react-router-native";
import Explore from './screens/explore/Explore';
import Profile from './screens/profile/Profile';
import Conversation from './screens/conversation/Conversation';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const history = useHistory()

  const storeData = async (value:any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@current_user', jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(auth_user=>{
        if(auth_user){
            history.push('/chats')
            storeData(auth_user)
        }
    })

    return unsubscribe;
  },[])

  return (
    <NativeRouter>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/chats' component={Home} />
          <Route path='/explore' component={Explore} />
          <Route path='/conversation' component={Conversation} />
          <Route path='/profile' component={Profile} />
          <Route path='/' component={Login} />
        </Switch>
    </NativeRouter>
  );
}
