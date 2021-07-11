import React from 'react'
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const ConversatonInput = () => {
    return (
        <View style={styles.converinput}>
            <TextInput placeholder="Type message..." style={styles.input} />
            <TouchableOpacity style={{marginRight: 15}}>
                <Ionicons name="ios-camera-outline" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
                <Ionicons name="ios-send" size={20} color="#374151" />
            </TouchableOpacity>
            
        </View>
    )
}

export default ConversatonInput

const styles = StyleSheet.create({
    converinput:{
        width: '95%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input:{
        paddingVertical: 15,
        fontSize: 15,
        borderRadius: 50,
        paddingHorizontal: 20,
        flex:1
    }
})
