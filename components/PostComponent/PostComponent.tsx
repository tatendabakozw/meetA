import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import UserAvatar from '../UserAvatar/UserAvatar';
import Username from '../Username/Username';
// import StackedAvatar from '../StackedAvatar/StackedAvatar';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { like_a_post_Action } from '../../redux/actions/postActions';

interface Props {
    id: string,
    post_user_image?: any,
    name: string,
    time_posted: string,
    post_body: any,
    likes: number,
    comments: number,
    user_id?: string,
    post_picture?: string,
    verified?: boolean,
    logged_in_user?: any,
    liked?: boolean,
}



const PostComponent = ({ id, post_user_image, name, time_posted, post_body, likes, comments, post_picture, user_id, verified, logged_in_user, liked }: Props) => {
    const dispatch = useDispatch()

    const like_post = () => {
        dispatch(like_a_post_Action(id, logged_in_user.token))
    }

    const navigation = useNavigation()

    return (
        <View style={tw`flex flex-col p-4 bg-gray-100 rounded-xl mb-8 w-full flex-1`}>
            <View style={tw`flex flex-row items-center mb-4 flex-1`}>
                <TouchableOpacity onPress={() => navigation.navigate('details', { id: user_id })}>

                    <UserAvatar picture={post_user_image} size="lg" user_id={user_id} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('details', { id: user_id })} style={tw`flex flex-col`}>
                    <View style={tw`flex flex-row items-center`}>
                        <Username name={name} fontSize={17} fontWeight='700' verified={verified} />
                    </View>

                    <Text style={[tw`text-gray-500`, { fontSize: 12 }]}>{moment(time_posted).fromNow()}</Text>
                </TouchableOpacity>
                <View style={tw`flex-1`} />
                <MaterialCommunityIcons name="dots-horizontal" size={20} color="#6B7280" />
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('singlepost', { id: id })}>

                <Text style={[tw`text-gray-700 mb-2`, { fontWeight: '600', fontSize: 15 }]}>
                    {post_body}
                </Text>
                {
                    post_picture ? (
                        <View style={tw`w-full rounded-lg overflow-hidden flex-1`}>
                            {post_picture && (
                                <Image source={{ uri: post_picture }} style={[tw`rounded-lg flex-1`, { height: undefined, width: '100%', aspectRatio: 1 }]} resizeMode="cover" />
                            )}
                        </View>
                    ) : (
                        <Text>{post_picture}</Text>
                    )
                }
            </TouchableOpacity>
            {/* <View style={tw`my-2`}>
                <StackedAvatar maxAvatars={2} round={true} size={50} avatars={avatars}  /> 
            </View> */}
            <View style={tw`border-b border-gray-300 w-full my-4`} />
            <View style={tw`flex flex-row items-center p-2 mr-2`}>
                <TouchableOpacity activeOpacity={0.8} onPress={like_post} style={tw`flex flex-row items-center mr-4`}>
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
                <TouchableOpacity style={tw`flex flex-row items-center`}>
                    <Ionicons name="chatbubble-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    <Text style={tw`mx-1`}>{comments}</Text>
                    {/* <Text style={tw``}>comments</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostComponent

const styles = StyleSheet.create({})
