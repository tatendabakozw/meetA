import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
// import StackedAvatar from '../StackedAvatar/StackedAvatar';

interface Props {
    id: string,
    post_user_image?: any,
    name: string,
    time_posted: string,
    post_body: any,
    likes: number,
    comments: number,
    user_id?: string
}

const PostComponent = ({ id, post_user_image, name, time_posted, post_body, likes, comments, user_id }: Props) => {

    const navigation = useNavigation()

    return (
        <View style={tw`flex flex-col p-4 bg-gray-100 rounded-xl mb-8 w-full flex-1`}>
            <View style={tw`flex flex-row items-center mb-4 flex-1`}>
                <TouchableOpacity onPress={() => navigation.navigate('details',{id: user_id})}>
                    <View style={[tw`border-2 overflow-hidden border-gray-400 mr-2`, { borderRadius: 50 }]}>
                        <View style={[tw`border overflow-hidden h-12 w-12 border-white`, { borderRadius: 50 }]}>
                            <Image source={require('../../assets/imgs/bako.jpg')} style={[tw`h-12 w-12`, { borderRadius: 50 }]} resizeMode="cover" />
                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('details',{id: user_id})} style={tw`flex flex-col`}>
                    <View style={tw`flex flex-row items-center`}>
                        <Text style={[tw`text-gray-900 mr-2`, {fontSize: 15, fontWeight: '700'}]}>{name}</Text>
                        <MaterialIcons name="verified" size={16} color="#1E3A8A" />
                    </View>

                    <Text style={[tw`text-gray-500`, {fontSize: 12}]}>{time_posted} ago</Text>
                </TouchableOpacity>
                <View style={tw`flex-1`} />
                <MaterialCommunityIcons name="dots-horizontal" size={20} color="#6B7280" />
            </View>
            <Text style={[tw`text-gray-700 mb-2`, { fontWeight: '600', fontSize: 15 }]}>
                {post_body}
            </Text>
            <View style={tw`w-full rounded-lg overflow-hidden flex-1`}>
                <Image source={require('../../assets/imgs/bako.jpg')} style={[tw`rounded-lg flex-1`, {height:undefined, width: '100%', aspectRatio: 1}]} resizeMode="cover" />
            </View>
            {/* <View style={tw`my-2`}>
                <StackedAvatar maxAvatars={2} round={true} size={50} avatars={avatars}  /> 
            </View> */}
            <View style={tw`border-b border-gray-300 w-full my-4`} />
            <View style={tw`flex flex-row items-center p-2 mr-2`}>
                <TouchableOpacity style={tw`flex flex-row items-center mr-4`}>
                    <Ionicons name="heart-outline" size={24} style={tw`text-gray-700 font-bold`} />
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
