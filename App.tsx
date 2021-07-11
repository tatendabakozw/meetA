import 'react-native-gesture-handler';
import React from 'react';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/home/Home';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import Explore from './screens/explore/Explore';
import Profile from './screens/profile/Profile';
import Conversation from './screens/conversation/Conversation';

export default function App() {
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
