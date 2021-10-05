import React, { useState, useEffect, Fragment } from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import ConverHeader from '../../components/ConverHeader/ConverHeader';
import { useDispatch } from 'react-redux';
import { getData } from '../../helpers/async-storage';
import { useNavigation } from '@react-navigation/core';
import { socket } from '../../helpers/socket';
import OutgoingMessage from '../../components/MessageComponents/OutgoingMessage';
import { MessageComponent } from '../../components/MessageComponents/IncomingMessage';
import axios from 'axios';
import { apiUrl } from '../../helpers/apiUrl';
import ConversatonInput from '../../components/ConversationInput/ConversatonInput';

interface Props {
    header_title?: string,
    back_location: () => void,
    route?: any

}

const Conversation = ({ back_location, route }: Props) => {
    const [page_loading, setPageLoading] = useState(false)
    const [user_id, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [all_messages, setAllMessages] = useState<any>([])
    const { id1, id2 } = route.params
    const navigation = useNavigation()

    useEffect(() => {
        //get user data from async strage
        setPageLoading(true)
        getData().then(res => {
            setUserId(res._id)
            setToken(res.token)
            axios.get(`${apiUrl}/chat/messages/${id1}/${id2}`, {
                headers: {
                    Authorization: res.token
                }
            }).then(res => {
                setAllMessages(res.data.messages)
                setPageLoading(false)

            })
        }).catch(error => {
            console.log(error)
            setPageLoading(false)
        })
    }, [])

    // @ts-ignore
    useEffect(() => {
        socket.on('message', data => {
            setAllMessages((old_messages: any) => [...old_messages, data])
            // console.log(data)
        })
    }, [socket])

    if (page_loading) {
        return (
            <SafeAreaView>
                <View>
                    <ConverHeader back_location={back_location} />
                </View>
                <View style={tw`flex-1 self-center items-center content-center pt-40`}>
                    <Text>Loading ...</Text>
                </View>

            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={tw`bg-gray-50 flex-1`}>
            <View>
                <ConverHeader back_location={() => navigation.goBack()} />
            </View>
            <KeyboardAvoidingView style={tw`flex-1`}>
                <ScrollView style={tw`flex-1 bg-gray-50 px-2 pt-4`}>
                    <View style={tw`pb-8`}>

                        {
                            all_messages?.map((message: any, index: any) => (
                                <Fragment key={index}>
                                    {
                                        message.sent_by === user_id ? (
                                            <OutgoingMessage message={message.body} time={message.createdAt} />
                                        ) : (
                                            <MessageComponent message={message.body} time={message.createdAt} />
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={tw`pt-2 bottom-2 w-full`}>
                    <ConversatonInput token={token} id1={id1} id2={id2} user_id={user_id} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Conversation

const styles = StyleSheet.create({
    converinput: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        paddingVertical: 15,
        fontSize: 15,
        borderRadius: 50,
        paddingHorizontal: 20,
        flex: 1
    }
})


