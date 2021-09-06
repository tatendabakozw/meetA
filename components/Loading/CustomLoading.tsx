import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const CustomLoading = () => {
    return (
        <View style={tw`flex flex-col items-center h-full my-auto py-24`}>
            <View style={tw`flex flex-col items-center`}>
                <ActivityIndicator color='#1E3A8A' size="large" />
                <Text style={tw`text-xl`}>Loading...</Text>
            </View>
        </View>
    )
}

export default CustomLoading

const styles = StyleSheet.create({})
