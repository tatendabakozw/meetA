import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeChat from '../../components/HomeChat/HomeChat'
import HomeLayout from '../../layouts/HomeLayout'

interface Props{
    navigation : any
}

const Home = ({navigation}: Props) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerShown: false
        })
    },[navigation])

    return (
        <HomeLayout >
           <View >
               {/* <Text>l;kasj;lfkja;sljk</Text> */}
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
               <HomeChat />
           </View>
        </HomeLayout>
    )
}

export default Home

const styles = StyleSheet.create({
    home__header:{
        padding: 20,
        height: 150
    },
    home__container:{
        backgroundColor: "#fff",
        flex: 1,
        height: '100%'
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
