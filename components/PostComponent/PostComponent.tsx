import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { MaterialCommunityIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
// import StackedAvatar from '../StackedAvatar/StackedAvatar';

interface Props {
    id: string,
    post_user_image?: any,
    name: string,
    time_posted: string,
    post_body: any,
    likes: number,
    comments: number
}

const PostComponent = ({ id, post_user_image, name, time_posted, post_body, likes, comments }: Props) => {

    return (
        <View style={tw`flex flex-col p-4 bg-gray-100 rounded-xl mb-8`}>
            <View style={tw`flex flex-row items-center mb-4`}>
                <TouchableOpacity>
                    <View style={[tw`border-2 overflow-hidden border-blue-400 mr-2`, { borderRadius: 50 }]}>
                        <View style={[tw`border overflow-hidden h-12 w-12 border-white`, { borderRadius: 50 }]}>
                            <Image source={require('../../assets/imgs/bako.jpg')} style={[tw`h-12 w-12`, { borderRadius: 50 }]} resizeMode="cover" />
                        </View>
                    </View>
                    
                </TouchableOpacity>
                <View style={tw`flex flex-col`}>
                    <Text style={tw`text-gray-800 font-bold`}>{name}</Text>
                    <Text>{time_posted} ago</Text>
                </View>
                <View style={tw`flex-1`} />
                <MaterialCommunityIcons name="dots-horizontal" size={20} color="#6B7280" />
            </View>
            <Text style={[tw`text-gray-700`, { fontWeight: '600', fontSize: 16 }]}>
                {post_body}
            </Text>
            {/* <View style={tw`my-2`}>
                <StackedAvatar maxAvatars={2} round={true} size={50} avatars={avatars}  /> 
            </View> */}
            <View style={tw`border-b border-gray-300 w-full my-4`} />
            <View style={tw`flex flex-row items-center p-2 mr-2`}>
                <TouchableOpacity style={tw`flex flex-row items-center mr-4`}>
                    <Ionicons name="heart-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    <Text style={tw`mx-1`}>{likes}</Text>
                    <Text style={tw``}>likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center`}>
                    <Ionicons name="chatbubble-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    <Text style={tw`mx-1`}>{comments}</Text>
                    <Text style={tw``}>comments</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostComponent

const styles = StyleSheet.create({})
