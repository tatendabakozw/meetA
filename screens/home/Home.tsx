import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import HomeChat from '../../components/HomeChat/HomeChat'
import CustomLoading from '../../components/Loading/CustomLoading'
import Moments from '../../components/Moments/Moments'
import { getData } from '../../helpers/async-storage'
import HomeLayout from '../../layouts/HomeLayout'
import { get_all_user_chats_Action } from '../../redux/actions/chatActions'

interface Props {
    navigation?: any
}

const Home = ({ navigation }: Props) => {
    const [current_user, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    // @ts-ignore
    const _chats = useSelector(state => state.get_all_chats)
    const { chats } = _chats
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        getData().then(res => {
            setCurrentUser(res)
            setLoading(false)
            dispatch(get_all_user_chats_Action(res.token))
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <HomeLayout>
                <CustomLoading />
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
            {/* <>
                <Moments current_user={current_user} />
            </> */}
            {
                !current_user?.bio && (<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('profile')} style={tw`p-4 text-center rounded-lg my-4 bg-red-100`}>
                    <Text style={tw`text-center`}>Click here to add a bio to your account</Text>
                </TouchableOpacity>)
            }
            <>
                {
                    chats?.map((chat:any) =>(
                        <View key={chat._id}>
                            <HomeChat
                                name={chat.message_username}
                                message={chat.last_message}
                                time={chat.createdAt}
                                verified={chat.user_verified}
                                online_status={'online'}
                                room_id={chat.room_id}
                                chat_users={chat.chat_users}
                                current_user_id={current_user?._id}
                                sent_by_you={chat.sent_by_you}
                            />
                        </View>
                    ))
                }
            </>
        </HomeLayout>
    )
}

export default Home

const styles = StyleSheet.create({})
