import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'
import UserAvatar from '../UserAvatar/UserAvatar'
import Username from '../Username/Username'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    body?: string,
    user_pic?: string,
    username?: string,
    verified?: boolean,
    user_id?: any,
    liked_post?: boolean,
    liked?: any
}

const CommentComponent = ({ body, user_pic, username, verified, user_id, liked }: Props) => {
    const likes = 3

    const like_comment = () => { }

    return (
        <View>
            <TouchableOpacity style={tw`flex flex-row`} >
                <UserAvatar picture={user_pic} user_id={user_id} />
                <View style={tw`self-center flex-1`}>
                    <Username name={username} fontWeight={'700'} fontSize={17} verified={verified} />
                </View>

            </TouchableOpacity>
            <View style={tw` px-8 pt-2`}>
            <Text style={[tw`text-gray-700`, { fontSize: 14 }]}>{body}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={like_comment} style={tw`flex flex-row items-center my-4`}>
                {
                    liked ? (
                        <Ionicons name="heart" size={24} style={tw`text-pink-500 font-bold`} />
                    ) : (
                        <Ionicons name="heart-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    )
                }
                <Text style={tw`mx-1`}>{likes}</Text>
                {/* <Text style={tw``}>likes</Text> */}
            </TouchableOpacity>

            </View>
            <View style={tw`border-b border-gray-300 w-4/5 self-center mb-8`} />

        </View>
    )
}

export default CommentComponent

const styles = StyleSheet.create({})
