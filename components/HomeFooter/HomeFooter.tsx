import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useHistory, useLocation } from 'react-router-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeFooter = () => {

    const history = useHistory()
    const location = useLocation();

    const nav_option =[
        {
            icon : <Ionicons name="chatbubble-ellipses-outline" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            location__icon : <Ionicons name="chatbubble-ellipses-sharp"  size={20} color="#5B61B9" style={{marginBottom: 5}} />, 
            text: 'Chats',
            id: 1,
            location: '/chats'
        },
        {
            icon : <Ionicons name="md-earth-outline" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            text: 'Explore',
            id: 2,
            location: '/explore',
            location__icon : <Ionicons name="earth" size={20} color="#5B61B9" style={{marginBottom: 5}} />
        },
        {
            icon : <AntDesign name="user" size={20} color="#6B7280" style={{marginBottom: 5}} />,
            text: 'Profile',
            id: 3,
            location: '/profile',
            location__icon: <FontAwesome name="user" size={20} color="#5B61B9" style={{marginBottom: 5}} />
        }
    ]

    return (
        <View style={styles.footer}>
            
            
            {
                nav_option?.map(option=>(
                    <TouchableOpacity 
                        onPress={()=> history.push(`${option.location}`)} 
                        key={option.id} 
                        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {
                                location.pathname === option.location ? (option.location__icon) : (option.icon)
                            }
                            {
                                location.pathname === option.location ? (<Text style={{color: '#5B61B9'}}>{option.text}</Text>):
                                (<Text style={{color: '#6B7280'}}>{option.text}</Text>)
                            }
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
