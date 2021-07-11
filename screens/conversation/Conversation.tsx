import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'
import ConversationsLayout from '../../layouts/ConversationsLayout'

const Conversation = () => {
    const history = useHistory()
    return (
        <ConversationsLayout>
            <Text>Conversation Screen</Text>
            <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10}} onPress={()=> history.push('/')}>
                <Text style={{color: 'white', textAlign: 'center'}}>logout</Text>
            </TouchableOpacity>
        </ConversationsLayout>
    )
}

export default Conversation

const styles = StyleSheet.create({})
