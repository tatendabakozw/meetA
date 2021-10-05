import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    message?: string,
    time?: string
}

const OutgoingMessage = ({ message, time }: Props) => {
    return (
        <View style={tw`pb-1 ml-20`}>
            <View style={[tw`flex flex-col bg-blue-900 self-end`, {borderRadius: 20}]}>
                <Text style={[tw`py-2 px-4 text-white `, { fontSize: 15 }]}>{message}</Text>
            </View>
            <View style={tw`flex flex-row items-center self-end`}>
                <Text style={tw`text-xs self-end text-gray-500`}>{moment(time).fromNow(true)}</Text>
                <View style={styles.homechat__img}>
                    <Ionicons name="checkmark-done-circle-outline" size={16} color="#60A5FA" />
                </View>
            </View>
        </View>
    )
}

export default OutgoingMessage

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

