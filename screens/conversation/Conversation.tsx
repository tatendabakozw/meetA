import React, { useState, useEffect, Fragment } from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import ConverHeader from '../../components/ConverHeader/ConverHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_messages_Action, send_message_Action } from '../../redux/actions/chatActions';
import { getData } from '../../helpers/async-storage';
import { useNavigation } from '@react-navigation/core';
import { socket } from '../../helpers/socket';
import OutgoingMessage from '../../components/MessageComponents/OutgoingMessage';
import { MessageComponent } from '../../components/MessageComponents/IncomingMessage';
import axios from 'axios';
import { apiUrl } from '../../helpers/apiUrl';

interface Props {
    header_title?: string,
    back_location: () => void,
    route?: any

}

const Conversation = ({ back_location, route }: Props) => {
    const [page_loading, setPageLoading] = useState(false)
    const [new_message, setNewMessage] = useState('')
    const [user_id, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [all_messages, setAllMessages] = useState<any>([])
    // @ts-ignore
    const _message = useSelector(state => state.send_message)
    const { loading } = _message

    const dispatch = useDispatch()
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
            }).then(res=>{
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

    const send_message = () => {
        if (user_id === id1) {
            // then id2 is receiveing so shiuld be passed as parameter
            dispatch(send_message_Action(id2, token, new_message))
            socket.emit('message', new_message)
            setNewMessage('')
        }
        else {
            // then id1 is receiveing so shiuld be passed as parameter
            dispatch(send_message_Action(id1, token, new_message))
            setNewMessage('')
            socket.emit('message', new_message)
        }
    }

    if (page_loading) {
        return (
            <SafeAreaView>
                <View>
                    <ConverHeader back_location={back_location} />
                </View>
                <View>
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

                <ScrollView style={tw`flex-1 bg-gray-50 px-2`}>

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

                </ScrollView>
                <View style={tw`pt-2 bottom-2 w-full`}>
                    <View style={styles.converinput}>
                        {/* <Text>{id}</Text> */}
                        <TextInput
                            multiline={true}
                            placeholder="Type message..."
                            style={styles.input}
                            value={new_message}
                            onChangeText={text => setNewMessage(text)}
                        />
                        <TouchableOpacity style={{ marginRight: 15 }}>
                            <Ionicons name="ios-camera-outline" size={24} color="#374151" />
                        </TouchableOpacity>
                        {
                            loading ? (<TouchableOpacity disabled={true} style={{ marginRight: 10 }}>
                                <Ionicons name="ios-send" size={20} color="#3B82F6" />
                            </TouchableOpacity>) : (<TouchableOpacity onPress={send_message} style={{ marginRight: 10 }}>
                                <Ionicons name="ios-send" size={20} color="#374151" />
                            </TouchableOpacity>)
                        }

                    </View>
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


