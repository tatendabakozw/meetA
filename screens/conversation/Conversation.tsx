import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ConversationsLayout from '../../layouts/ConversationsLayout'
import { Ionicons } from '@expo/vector-icons';
import { getData } from '../../helpers/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_messages_Action } from '../../redux/actions/chatActions';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment'

interface Props {
    navigation?: any,
    route?: any
}

const Conversation = ({ navigation, route }: Props) => {
    const { id1, id2 } = route.params
    const dispatch = useDispatch()
    // @ts-ignore
    const _message = useSelector(state => state.get_messages)
    const { loading, messages } = _message
    const [user, setUser] = useState()

    useEffect(() => {
        getData().then(res => {
            dispatch(get_all_messages_Action(id1, id2, res.token))
            setUser(res._id)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    if (loading) {
        <ConversationsLayout back_location={() => navigation.goBack()}>
            <View>
                <Text>Loading ...</Text>
            </View>
        </ConversationsLayout>
    }

    return (
        <ConversationsLayout back_location={() => navigation.goBack()}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#D1FAE5', borderRadius: 50, padding: 10, width: '45%', marginVertical: 10, borderWidth: 1, borderColor: '#047857' }}>
                        <Text style={{ color: '#047857', textAlign: 'center' }}>APPROVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#FEE2E2', borderRadius: 50, padding: 10, width: '45%', marginVertical: 10, borderWidth: 1, borderColor: '#F87171' }}>
                        <Text style={{ color: '#B91C1C', textAlign: 'center' }}>DISAPPROVE</Text>
                    </TouchableOpacity>
                </View>
                {
                    messages?.messages?.map((message: any) => (
                        <>
                            {message.sent_by === user ? (
                                <View style={tw`self-start`}>
                                    <MessageComponent />
                                </View>
                            ) : (
                                <View style={tw`self-end`}>
                                    <OutgoingMessageComponent message={message.body} time={message.createdAt} />
                                </View>
                            )}
                        </>
                    ))
                }
            </View>
        </ConversationsLayout>
    )
}

interface Props {
    message?: string,
    time?: string
}

const OutgoingMessageComponent = ({ message, time }: Props) => {
    return (
        <View style={tw`flex flex-col flex-1 w-full`}>
            <View style={[tw`flex flex-col w-4/5 pb-1 self-end`]}>
                <Text style={[tw`bg-blue-900 py-2 px-4 text-white rounded-xl `, {fontSize: 15}]}>{message}{message}{message}{message}{message}{message}{message}{message}</Text>
            </View>
            <View style={tw`flex flex-row items-center self-end`}>
                <Text style={tw`text-xs self-end text-gray-500`}>{moment(time).fromNow()}</Text>
                <View style={styles.homechat__img}>
                    <Ionicons name="checkmark-done-circle-outline" size={16} color="#60A5FA" />
                </View>
            </View>
        </View>
    )
}

const MessageComponent = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', right: 0 }}>

            <View style={{ backgroundColor: '#5B61B9', padding: 10, borderRadius: 50 }}>
                <Text style={{ color: 'white' }}>Yo! G wassup</Text>
            </View>

        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({
    homechat__imgContainer: {
        padding: 5,
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    homechat__img: {
        borderRadius: 50,
        marginLeft: 10,
        flexDirection: 'row',
    }
})
