import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { send_message_Action } from '../../redux/actions/chatActions';
import { Ionicons } from '@expo/vector-icons';

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
        </>
    )
}

export default ConversatonInput

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
