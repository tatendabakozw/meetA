import React, {useLayoutEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Header} from 'react-native-elements'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import {useSafeArea} from 'react-native-safe-area-context'

interface Props{
    navigation : any
}

const Home = ({navigation}: Props) => {
    const insets = useSafeArea();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerShown: false
        })
    },[navigation])

    return (
        <View style={{paddingTop: insets.top}}>
            <View style={styles.home__container}>
                <HomeHeader/>
                <Text>
                    home page sajlfkja
                </Text>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    home__header:{
        padding: 20,
        height: 150
    },
    home__container:{
        flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
