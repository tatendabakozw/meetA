import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface Props{
    message ?: any
}

const SucCess = ({message}:Props) => {
    return (
        <View style={tw`bg-green-50 p-4 rounded-lg w-full border border-green-600`}>
            <Text style={tw`text-center text-green-600`}>{message}</Text>
        </View>
    )
}

export default SucCess

const styles = StyleSheet.create({})
