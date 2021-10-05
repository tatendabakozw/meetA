import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';

interface Props {
    message?: string,
    time?: string
}

export const MessageComponent = ({ message, time }: Props) => {
    return (
        <View style={[tw`mr-20`,{ flexDirection: 'row', alignItems: 'center', right: 0 }]}>

            <View style={[tw`flex flex-col pb-1 self-start`]}>
                <Text style={[tw`bg-gray-200 py-2 px-4 text-gray-900 `, { fontSize: 15, borderRadius: 20 }]}>{message}</Text>
            </View>

        </View>
    )
}