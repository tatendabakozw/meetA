import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import HomeChat from '../../components/HomeChat/HomeChat'
import HomeLayout from '../../layouts/HomeLayout'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';
// import { useHistory } from 'react-router-native';

interface Props{
    navigation : any
}

const Home = ({navigation}:Props) => {
    const [user, setUser] = useState<any>()
    const [name_loading, setNameLoading] = useState(false)
    const [user_doc, setUserDoc] = useState<any>()
    const [user_bio, setUserBio] = useState('')
    // const history = useHistory()

    const getData = async () => {
        setNameLoading(true)
        try {
            const jsonValue = await AsyncStorage.getItem('@current_user')
            jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
            setNameLoading(false)
        } catch(e) {
        // error reading value
            console.log(e)
        }
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
            id: 1,
            location: 'conversation'
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 2,
            location: 'conversation'
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 3,
            location: 'conversation'
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 4,
            location: 'conversation'
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 5,
            location: 'conversation'
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 6,
            location: 'conversation'
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 7,
            location: 'conversation'
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 8,
            location: 'conversation'
        },
        {
            name : 'Tatenda Bako',
            message: 'zvirisei my G, urikupi',
            online_status : 'online',
            propic : `${require('../../assets/imgs/woman.png')}`,
            time: '5m',
            id: 9,
            location: 'conversation'
        },
        {
            name : 'tatendaZw',
            message: 'my name is tatenda bako, i hope this message is long enough to test illepsum',
            online_status : 'offline',
            propic : `${require('../../assets/imgs/man.png')}`,
            time: '1m',
            id: 10,
            location: 'conversation'
        }
    ]

    const getUserDoc = async () =>{
        const cityRef = db.collection('meetA').doc(user.uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            // console.log('Document data:', doc.data());
            setUserDoc(doc.data())
        }
    }

    //get user info
    useEffect(()=>{
        getUserDoc()
    },[user])

    //get user bio
    useEffect(()=>{
        AsyncStorage.getItem('@user_bio').then((res: any)=>{
            setUserBio(res)
        }).catch(err=>{
            console.log(err)
        })
    })

    return (
        <HomeLayout header_title={name_loading ? "Chats" : user?.user?.displayName} >
               
           <View style={styles.home} >
                {/* <Text>{user_doc ? 'ehe' : 'maya'}</Text> */}
                {/* <Text>{user_bio}</Text> */}
                {
                    !user_bio ? (
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            // onPress={()=> history.push('/profile')} 
                            onPress={() => navigation.navigate('/profile')}
                            style={{padding: 20, backgroundColor: '#FEE2E2', borderRadius: 15, borderColor: '#EF4444', borderWidth:0.5, marginVertical: 20}}>
                            <Text style={{color: '#4B5563', fontSize:15}}>Seems you haven't created a bio yet, click here to create your bio</Text>
                        </TouchableOpacity>
                    ):null
                }

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
