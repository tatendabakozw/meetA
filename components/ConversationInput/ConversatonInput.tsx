import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { send_message_Action } from '../../redux/actions/chatActions';
import { auth } from '../../firebase';

interface Props {
    id: any
}

const ConversatonInput = ({ id }: Props) => {
    const [new_message, setNewMessage] = useState('')

    // @ts-ignore
    const _message = useSelector(state => state.send_message)
    const { loading, error } = _message

    const dispatch = useDispatch()

    const send_message = () => {
        dispatch(send_message_Action(id, auth.currentUser?.uid, new_message))
        setNewMessage('')
    }

    return (
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
