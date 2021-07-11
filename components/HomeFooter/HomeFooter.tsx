import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const HomeFooter = () => {

    const nav_option =[
        {
            icon : <Ionicons name="chatbubble-ellipses-outline" size={30} color="#374151" style={{marginBottom: 5}} />,
            text: 'Chats',
            id: 1
        },
        {
            icon : <Ionicons name="md-earth-outline" size={30} color="#374151" style={{marginBottom: 5}} />,
            text: 'Explore',
            id: 2
        },
        {
            icon : <AntDesign name="user" size={30} color="#374151" style={{marginBottom: 5}} />,
            text: 'Profile',
            id: 3
        }
    ]

    return (
        <View style={styles.footer}>
            {
                nav_option?.map(option=>(
                    <View key={option.id}>
                        {option.icon}
                        {/* <Ionicons name="chatbubble-ellipses-sharp" size={24} color="black" /> */}
                        <Text style={{color: '#374151', fontWeight: '700'}}>{option.text}</Text>
                    </View>
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
