import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

const HomeFooter = () => {

    const history = useHistory()

    const nav_option =[
        {
            icon : <Ionicons name="chatbubble-ellipses-outline" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            text: 'Chats',
            id: 1,
            location: '/home'
        },
        {
            icon : <Ionicons name="md-earth-outline" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            text: 'Explore',
            id: 2,
            location: '/explore'
        },
        {
            icon : <AntDesign name="user" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            text: 'Profile',
            id: 3,
            location: '/login'
        }
    ]

    return (
        <View style={styles.footer}>
            
            
            {
                nav_option?.map(option=>(
                    <TouchableOpacity onPress={()=> history.push(`${option.location}`)} key={option.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {option.icon}
                        {/* <Ionicons name="chatbubble-ellipses-sharp" size={24} color="black" /> */}
                        <Text style={{color: '#6B7280'}}>{option.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


export default HomeFooter

const styles = StyleSheet.create({
    footer:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
