import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'

const Conversation = () => {
    const history = useHistory()
    return (
        <View>
            <Text>Conversation Screen</Text>
            <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10}} onPress={()=> history.push('/')}>
                <Text style={{color: 'white', textAlign: 'center'}}>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({})
