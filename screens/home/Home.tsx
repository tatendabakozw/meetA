import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import HomeChat from '../../components/HomeChat/HomeChat'
import CustomLoading from '../../components/Loading/CustomLoading'
import Moments from '../../components/Moments/Moments'
import { getData } from '../../helpers/async-storage'
import HomeLayout from '../../layouts/HomeLayout'
import { get_current_set_user_Action } from '../../redux/actions/userActions'

interface Props {
    navigation?: any
}

const Home = ({ navigation }: Props) => {
    // @ts-ignore
    const user_info = useSelector(state => state.current_user)
    const { loading, user } = user_info
    // @ts-ignore
    const _messages = useSelector(state => state.get_all_messages)
    const { all_messages_loading, all_messages } = _messages
    const dispatch = useDispatch()

    useEffect(() => {
        getData().then(res => {
            console.log(res.uid)
            dispatch(get_current_set_user_Action(res.uid))
        }).catch(error => {
            console.log(error)
        })
    }, [dispatch])

    console.log(all_messages)


    if (loading ) {
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
            {/* <Text>{JSON.stringify(all_messages)}</Text> */}
            <>
                <Moments />
            </>
            <>
                {
                    all_messages?.init_chats?.map((detail: any) => (
                        <View key={detail.id}>
                            <Text>aasdf</Text>
                            <HomeChat
                                key={detail.info.chat_id}
                                name={detail.sender.displayName}
                                message={detail.info.last_message}
                                online_status={detail.sender.online_status}
                                propic={detail.sender.photoURL}
                                time={detail.info.time}
                                location={detail.location}
                                pushingToPage={() => navigation.navigate('conversation', { id: user?.uid })}
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
