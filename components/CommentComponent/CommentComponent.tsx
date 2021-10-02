import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'
import UserAvatar from '../UserAvatar/UserAvatar'
import Username from '../Username/Username'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
        <View style={tw`flex flex-row px-4`}>
            <TouchableOpacity style={tw`flex flex-row`} >
                <UserAvatar picture={user_pic} user_id={user_id} />
            </TouchableOpacity>
            <View style={tw`pt-2 flex-1`}>
                <View style={tw`flex-1`}>
                    <Username name={username} fontWeight={'700'} fontSize={17} verified={verified} />
                </View>
                <Text style={[tw`text-gray-700`, { fontSize: 14 }]}>{body}</Text>
                <View style={tw`flex flex-row items-center w-3/5 justify-between`}>
                    <TouchableOpacity activeOpacity={0.8} onPress={like_comment} style={tw`flex flex-row items-center my-4`}>
                        {
                            !liked ? (
                                <AntDesign name="like1" size={16} style={tw`text-pink-500`} />
                            ) : (
                                <AntDesign name="like2" size={16} style={tw`text-gray-700`} />
                            )
                        }
                        <Text style={tw`mx-1 text-sm`}>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={like_comment} style={tw`flex flex-row items-center my-4`}>
                        {
                            liked ? (
                                <AntDesign name="dislike1" size={16} style={tw`text-blue-900`} />
                            ) : (
                                <AntDesign name="dislike2" size={16} style={tw`text-gray-700`} />
                            )
                        }
                        <Text style={tw`mx-1 text-sm`}>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={like_comment} style={tw`flex flex-row items-center my-4`}>
                        <EvilIcons name="comment" size={24} style={tw`text-gray-700`} />
                        <Text>1</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`border-b border-gray-300 w-full self-center mb-8`} />
            </View>

        </View>
    )
}

export default CommentComponent

const styles = StyleSheet.create({})
