import React from 'react'
import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface Props{
    error ?: any
}

const Error = ({error}:Props) => {
    return (
        <View style={tw`bg-red-50 p-4 rounded-lg w-full border border-red-500`}>
            <Text style={tw`text-center text-red-400`}>{error}</Text>
        </View>
    )
}

export default Error
