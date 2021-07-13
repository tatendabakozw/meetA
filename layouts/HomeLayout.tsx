import React from 'react'
import { ReactNode } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import HomeHeader from '../components/HomeHeader/HomeHeader';

interface Props{
    children ?: ReactNode,
    header_title ?: string
}

const HomeLayout = ({children, header_title}:Props) => {

    return (
        <SafeAreaView style={{ flex:1}}>
            <View><HomeHeader heading__title={header_title}/></View>
            <ScrollView style={{paddingHorizontal: 20, backgroundColor: '#F9FAFB'}}>{children}</ScrollView>
            {/* <View style={{ bottom: 0, left: 0, right: 0}}><HomeFooter/></View> */}
        </SafeAreaView>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})