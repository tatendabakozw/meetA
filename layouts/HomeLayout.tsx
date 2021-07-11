import React from 'react'
import { ReactNode } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import HomeFooter from '../components/HomeFooter/HomeFooter';
import HomeHeader from '../components/HomeHeader/HomeHeader';

interface Props{
    children ?: ReactNode,
}

const HomeLayout = ({children}:Props) => {

    return (
        <View style={{ flex:1}}>
            <View><HomeHeader/></View>
            <ScrollView style={{paddingHorizontal: 20, backgroundColor: '#F9FAFB'}}>{children}</ScrollView>
            <View style={{ bottom: 0, left: 0, right: 0}}><HomeFooter/></View>
        </View>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})