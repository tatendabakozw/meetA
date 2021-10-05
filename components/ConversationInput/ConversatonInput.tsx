import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { send_message_Action } from '../../redux/actions/chatActions';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Props {
    user_id?: string,
    id1?: string,
    id2?: string,
    token?: string
}

const ConversatonInput = ({ user_id, id1, id2, token }: Props) => {
    const [new_message, setNewMessage] = useState('')
    const dispatch = useDispatch()
    // @ts-ignore
    const _message = useSelector(state => state.send_message)
    const { loading } = _message

    const send_message = () => {
        if (!new_message) {
            console.log('cant send empty message')
        } else {
            if (user_id === id1) {
                // then id2 is receiveing so shiuld be passed as parameter
                dispatch(send_message_Action(id2, token, new_message.trim()))
                // socket.emit('message', new_message)
                setNewMessage('')
            }
            else {
                // then id1 is receiveing so shiuld be passed as parameter
                dispatch(send_message_Action(id1, token, new_message.trim()))
                setNewMessage('')
                // socket.emit('message', new_message)
            }
        }
    }

    return (
        <>
            <View style={tw`flex-row px-2`}>
                <TouchableOpacity style={tw` py-2 pr-2 rounded-full self-end`}>
                    <MaterialIcons name="emoji-emotions" size={32} color="#374151" />
                </TouchableOpacity>
                <View style={[tw`bg-white shadow-sm p-2 flex-1 flex-row`, {borderRadius: 30}]}>
                    <TextInput
                        multiline={true}
                        style={[tw`self-center flex-1 p-2 text-lg`, {borderRadius: 30}]}
                        placeholder="Start typing ..."
                        value={new_message}
                        onChangeText={text => setNewMessage(text)}
                    />
                    <TouchableOpacity style={tw`self-end p-2`}>
                    <MaterialIcons name="attach-file" size={24} color="#374151" />
                    </TouchableOpacity>
                    {
                        loading ? (<TouchableOpacity disabled={true} style={tw`self-end p-2`}>
                            <Ionicons name="ios-send" size={24} color="#3B82F6" />
                        </TouchableOpacity>) : (<TouchableOpacity onPress={send_message} style={tw`self-end p-2`}>
                            <Ionicons name="ios-send" size={24} color="#374151" />
                        </TouchableOpacity>)
                    }
                </View>
            </View>
        </>
    )
}

export default ConversatonInput
