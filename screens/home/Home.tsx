import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import HomeChat from '../../components/HomeChat/HomeChat'
import CustomLoading from '../../components/Loading/CustomLoading'
import { auth } from '../../firebase'
import HomeLayout from '../../layouts/HomeLayout'
import { get_all_messages_Action } from '../../redux/actions/chatActions'
import { get_current_set_user_Action } from '../../redux/actions/userActions'

interface Props {
    navigation?: any
}

const Home = ({ navigation }: Props) => {
    // @ts-ignore
    const user_info = useSelector(state => state.current_user)
    const { loading, user } = user_info
    // @ts-ignore
    const _messages = useSelector(state=> state.get_all_messages)
    const {all_messages_loading, all_messages} = _messages
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_current_set_user_Action(auth.currentUser?.uid))
    }, [dispatch])

    useEffect(()=>{
        dispatch(get_all_messages_Action(auth.currentUser?.uid))
    },[dispatch])

    // console.log(auth.currentUser?.uid)

    if (loading) {
        return (
            <HomeLayout header_title={'Profile'}>
                <CustomLoading />
            </HomeLayout>
        )
    }
    
    return (
        <HomeLayout header_title="Home">
            {
                !user?.bio && (<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('profile')} style={tw`p-4 text-center rounded-lg my-4 bg-red-100`}>
                    <Text style={tw`text-center`}>Click here to add a bio to your account</Text>
                </TouchableOpacity>)
            }
            <Text>{JSON.stringify(all_messages)}</Text>
            {/* <>
                {
                    all_messages?.map((detail:any) => (
                        <HomeChat
                            key={detail.id}
                            name={detail.name}
                            message={detail.message}
                            online_status={detail.online_status}
                            propic={detail.propic}
                            time={detail.time}
                            location={detail.location}
                            pushingToPage={() => navigation.navigate('conversation', {id: user?.uid})}
                        />
                    ))
                }
            </> */}
        </HomeLayout>
    )
}

export default Home

const styles = StyleSheet.create({})
