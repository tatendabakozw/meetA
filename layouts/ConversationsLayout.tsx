import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import ConverHeader from '../components/ConverHeader/ConverHeader'

interface Props{
    children ?: ReactNode,
    header_title ?: string
}

const ConversationsLayout = ({children}:Props) => {
    return (
        <SafeAreaView style={{ flex:1}}>
            <View><ConverHeader/></View>
            <ScrollView style={{backgroundColor: '#F3F4F6'}}>{children}</ScrollView>
        </SafeAreaView>
    )
}

export default ConversationsLayout

const styles = StyleSheet.create({})
