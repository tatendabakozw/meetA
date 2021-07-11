import React from 'react'
import { ReactNode } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import HomeFooter from '../components/HomeFooter/HomeFooter';
import HomeHeader from '../components/HomeHeader/HomeHeader';

interface Props{
    children ?: ReactNode
}

const HomeLayout = ({children}:Props) => {
    const insets = useSafeArea();

    return (
        <View style={{paddingTop: insets.top, flex:1}}>
            <View><HomeHeader/></View>
            <ScrollView style={{padding: 20}}>{children}</ScrollView>
            <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}><HomeFooter/></View>
        </View>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})