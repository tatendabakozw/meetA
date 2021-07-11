import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import ConverHeader from '../components/ConverHeader/ConverHeader'
import ConversatonInput from '../components/ConversationInput/ConversatonInput'

interface Props{
    children ?: ReactNode,
    header_title ?: string
}

const ConversationsLayout = ({children}:Props) => {
    return (
        <SafeAreaView style={{ flex:1, backgroundColor: '#F3F4F6'}}>
            <View><ConverHeader/></View>
            <ScrollView style={{backgroundColor: '#F3F4F6', flex: 1}}>{children}</ScrollView>
            <View style={{ bottom: 20, left: 0, right: 0, backgroundColor: '#F3F4F6'}}><ConversatonInput/></View>
        </SafeAreaView>
    )
}

export default ConversationsLayout

const styles = StyleSheet.create({})
