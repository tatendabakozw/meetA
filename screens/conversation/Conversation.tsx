import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import io from 'socket.io-client';
import { apiUrl, socketUrl } from '../../helpers/apiUrl';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import ConverHeader from '../../components/ConverHeader/ConverHeader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_messages_Action, send_message_Action } from '../../redux/actions/chatActions';
import { getData } from '../../helpers/async-storage';
import { useNavigation } from '@react-navigation/core';
const sock = io(socketUrl, {
    transports: ['websocket'],
    forceNew: true,
});

interface Props {
    header_title?: string,
    back_location: () => void,
    route ?: any
    
}


const Conversation = ({ back_location, route }: Props) => {
    const [new_message, setNewMessage] = useState('')
    const [mes, setMsg] = useState<any()
    const [page_loading, setPageLoading] = useState(false)
    const [user_id, setUserId] = useState('')
    const [token, setToken] = useState('')
    // @ts-ignore
    const _message = useSelector(state => state.send_message)
    const { loading, error } = _message

    const dispatch = useDispatch()
    const {id1, id2}  = route.params
    const navigation = useNavigation()

    useEffect(() => {
        //start loading page
        setPageLoading(true)

        //get user data from async strage
        getData().then(res => {
            setUserId(res._id)
            setToken(res.token)
            setPageLoading(false)

            dispatch(get_all_messages_Action(id1, id2, token))

            sock.on('output-message',data=>{
                console.log(data)
            })

            //connect socket io
            sock.on('connection', () => {
                console.log(`I'm connected with the back-end`);
                debugger;
            })

            //get the message that has been sent from server
            sock.on('message', (msg) => {
                setMsg([...msg, ...msg])
                console.log('received')
                console.log(msg)
            })
        }).catch(error => {
            console.log(error)
            setPageLoading(false)
        })

    }, [setMsg])

    console.log(token)

    const send_something = () => {
        axios.post(`${apiUrl}/chat/send_message`)
        sock.emit('message', 'demo');
    }

    const send_message = () => {
        if (user_id === id1) {
            // then id2 is receiveing so shiuld be passed as parameter
            dispatch(send_message_Action(id2, token, new_message))
        }
        else {
            // then id1 is receiveing so shiuld be passed as parameter
            dispatch(send_message_Action(id1, token, new_message))
        }
    }

    if(page_loading){
        return(
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
                <ConverHeader back_location={()=> navigation.goBack()} />
            </View>
            <ScrollView style={tw`flex-1 bg-gray-50`}>
                <View style={tw`flex-end`}>
                    <Text>{mes}</Text>
                </View>
                <View style={tw`flex-end`}>
                    <Text>messages</Text>
                </View>
                <View>
                    <Text>input</Text>
                </View>
                <View style={tw`flex-end`}>
                    <Text>messages</Text>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={send_something}>
                <Text>send something</Text>
            </TouchableOpacity>
            <View style={tw`pt-2 bottom-2 w-ful`}>
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
                        loading ? (<TouchableOpacity style={{ marginRight: 10 }}>
                            <Ionicons name="ios-send" size={20} color="#3B82F6" />
                        </TouchableOpacity>) : (<TouchableOpacity onPress={send_message} style={{ marginRight: 10 }}>
                            <Ionicons name="ios-send" size={20} color="#374151" />
                        </TouchableOpacity>)
                    }

                </View>
            </View>
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


