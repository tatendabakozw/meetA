import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConversationsLayout from '../../layouts/ConversationsLayout'

const Conversation = () => {
    const navigation = useNavigation() 
    return (
        <ConversationsLayout back_location={()=> navigation.goBack()}>
            <Text>conso</Text>
        </ConversationsLayout>
    )
}

export default Conversation

