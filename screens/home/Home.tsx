import React, {useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeChat from '../../components/HomeChat/HomeChat'
import HomeLayout from '../../layouts/HomeLayout'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';

const Home = () => {
    const [user, setUser] = useState<any>()
    const [name_loading, setNameLoading] = useState(false)
    const [user_doc, setUserDoc] = useState<any>()

    const storeUserData = async (value:any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_doc', jsonValue)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    const getData = async () => {
        setNameLoading(true)
        try {
            const jsonValue = await AsyncStorage.getItem('@current_user')
            if(jsonValue != null){
                setUser(JSON.parse(jsonValue))
                setNameLoading(false)
                const user_document = await db.collection('meetA').doc(JSON.parse(jsonValue).user.uid).get()
                if (!user_document) {
                    console.log('No such document!');
                  } else {
                    // setUserDoc(user_document.data())
                    storeUserData(user_document.data())
                  }
            }else{
                return null
            }
        } catch(e) {
        // error reading value
            console.log(e)
        }
    }

    const getUserDoc = () =>{
        db.collection('cities').doc('SF')
    }
  

    useEffect(()=>{
        getData()
    },[])

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
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 9
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 10
        }
    ]

    return (
        <HomeLayout header_title={name_loading ? "Chats" : user?.user?.displayName} >
            {/* <Text>{JSON.stringify(user)}</Text> */}
            <Text>{user_doc?.bio}</Text>
           <View style={styles.home} >
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
    home:{
        marginBottom: 30
    }
})
