import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import HomeChat from '../../components/HomeChat/HomeChat'
import CustomLoading from '../../components/Loading/CustomLoading'
import Moments from '../../components/Moments/Moments'
import { getData } from '../../helpers/async-storage'
import HomeLayout from '../../layouts/HomeLayout'

interface Props {
    navigation?: any
}

const Home = ({ navigation }: Props) => {
    const [current_user, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    // @ts-ignore
    const _messages = useSelector(state => state.get_all_messages)
    const { all_messages } = _messages

    useEffect(() => {
        setLoading(true)
        getData().then(res => {
            setCurrentUser(res)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    if (loading ) {
        return (
            <HomeLayout>
                <CustomLoading />
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
             <>
                <Moments />
            </>
            {
                !current_user?.bio && (<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('profile')} style={tw`p-4 text-center rounded-lg my-4 bg-red-100`}>
                    <Text style={tw`text-center`}>Click here to add a bio to your account</Text>
                </TouchableOpacity>)
            }
            {/* <Text>{JSON.stringify(all_messages)}</Text> */}
           
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
                                pushingToPage={() => navigation.navigate('conversation', { id: current_user?.uid })}
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
