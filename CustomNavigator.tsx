import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home/Home';
const Tab = createBottomTabNavigator();

const CustomNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="chats" component={Home}/>
        </Tab.Navigator>
    )
}

export default CustomNavigator

