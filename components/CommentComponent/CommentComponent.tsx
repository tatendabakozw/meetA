import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'
import Username from '../Username/Username'

const CommentComponent = () => {
    return (
        <View>
            <TouchableOpacity style={tw`flex flex-row`} >
                <View style={[tw`overflow-hidden mr-2`, { borderRadius: 50 }]}>
                    <View style={[tw`overflow-hidden h-12 w-12 border-white`, { borderRadius: 50 }]}>
                        <Image source={require('../../assets/imgs/bako.jpg')} style={[tw`h-12 w-12`, { borderRadius: 50 }]} resizeMode="cover" />
                    </View>
                </View>
                <View style={tw`self-center flex-1`}>
                    <Username verified />
                    <Text style={[tw`text-gray-700`, { fontSize: 14 }]}>Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over Iam a comment over hereasdkfhlkjasdhfljkashdflkjhasldkjfhlkja tatenda bako please be nice to me
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default CommentComponent

const styles = StyleSheet.create({})
