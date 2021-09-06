import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { MaterialCommunityIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
// import StackedAvatar from '../StackedAvatar/StackedAvatar';

const PostComponent = () => {
    const avatars = [
        { githubHandle: "SoorajSethumadhavan", name: "SoorajSethumadhavan" },
        { twitterHandle: "JorgenEvens", name: "Jorgen Evens" },
        { twitterHandle: "sitebase", name: "Wim Mostmans" }
    ];
    return (
        <View style={tw`flex flex-col p-4 bg-gray-100 rounded-xl mb-8`}>
            <View style={tw`flex flex-row items-center mb-4`}>
                <TouchableOpacity>
                    <Image source={require('../../assets/imgs/man.png')} style={[tw`rounded-full bg-white mr-2`, { height: 50, width: 50 }]} />
                </TouchableOpacity>
                <View style={tw`flex flex-col`}>
                    <Text style={tw`text-gray-800 text-lg font-bold`}>Tatenda Bako</Text>
                    <Text>4 mins ago</Text>
                </View>
                <View style={tw`flex-1`} />
                <MaterialCommunityIcons name="dots-horizontal" size={20} color="#6B7280" />
            </View>
            <Text style={[tw`text-gray-700`, { fontWeight: '600', fontSize: 16 }]}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum numquam laboriosam eveniet quo, consequuntur
                quidem veritatis quas totam, eos quam perferendis modi voluptates officia ipsa? Nam eos omnis fugit debitis?
            </Text>
            {/* <View style={tw`my-2`}>
                <StackedAvatar maxAvatars={2} round={true} size={50} avatars={avatars}  /> 
            </View> */}
            <View style={tw`border-b border-gray-300 w-full my-4`} />
            <View style={tw`flex flex-row items-center p-2 mr-2`}>
                <TouchableOpacity style={tw`flex flex-row items-center mr-4`}>
                    <Ionicons name="heart-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    <Text style={tw`mx-1`}>24</Text>
                    <Text style={tw``}>likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center`}>
                    <Ionicons name="chatbubble-outline" size={24} style={tw`text-gray-700 font-bold`} />
                    <Text style={tw`mx-1`}>4</Text>
                    <Text style={tw``}>comments</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostComponent

const styles = StyleSheet.create({})
