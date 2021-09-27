import React from 'react'
import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import { StatusBar } from 'expo-status-bar';

interface Props{
    children ?: ReactNode,
    header_title ?: string
}

const HomeLayout = ({children, header_title}:Props) => {

    return (
        <SafeAreaView style={[tw`pb-32`,{ flex:1}]}>
            <StatusBar style="light" />
            <View>
                <HomeHeader heading__title={header_title}/>
            </View>
            <ScrollView style={[tw`min-h-full flex-1`,{paddingHorizontal: 10, backgroundColor: '#F9FAFB'}]}>{children}</ScrollView>
            {/* <View style={{ bottom: 0, left: 0, right: 0}}><HomeFooter/></View> */}
        </SafeAreaView>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})