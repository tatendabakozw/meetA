import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ExploreHeader from '../components/ExploreHeader/ExploreHeader'
import HomeFooter from '../components/HomeFooter/HomeFooter'

interface Props{
    children ?: ReactNode,
    header_title ?: string,
    header__back__activity ?: () => void
}

const ExploreLayout = ({children, header_title, header__back__activity}:Props) => {
    return (
        <SafeAreaView style={{ flex:1}}>
            <View><ExploreHeader heading__title={header_title} header__back__activity={header__back__activity} /></View>
            <ScrollView style={{paddingHorizontal: 20, backgroundColor: '#F9FAFB'}}>{children}</ScrollView>
            {/* <View style={{ bottom: 0, left: 0, right: 0}}><HomeFooter/></View> */}
        </SafeAreaView>
    )
}

export default ExploreLayout

const styles = StyleSheet.create({})
