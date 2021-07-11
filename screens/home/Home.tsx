import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeChat from '../../components/HomeChat/HomeChat'
import HomeLayout from '../../layouts/HomeLayout'

interface Props{
    navigation : any
}

const Home = ({navigation}: Props) => {

    const chat_details = [
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 1
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 2
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 3
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 4
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 5
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 6
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 7
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 8
        }
    ]

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
            {
                chat_details?.map(detail=>(
                    <HomeChat 
                    key={detail.id}
                    name={detail.name}
                    message={detail.message}
                    online_status = {detail.online_status}
                    propic = {detail.propic}
                    time= {detail.time}
                    />
                ))
            }
 
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
