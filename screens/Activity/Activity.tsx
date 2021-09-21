import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HomeLayout from '../../layouts/HomeLayout'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import PostComponent from '../../components/PostComponent/PostComponent';
import MomentItem from '../../components/MomentItem/MomentItem';


function Activity() {

    const posts = [
        {
            id: '1',
            name: 'Tatenda Bako',
            time_posted: '5 mins',
            post_body: 'This is the first post on this app created by the developer. Enjoy your dating!',
            likes: 10,
            comments: 25,
            post_user_image: '../../assets/imgs/bako.jpg'

        }
    ]

    const create_a_post = () => {

    }

    const filter_posts = () => {

    }

    return (
        <HomeLayout header_title={'Activity'}>
            <Text style={tw`text-gray-700 text-lg mt-2 font-semibold`}>Moments</Text>
            <ScrollView horizontal contentContainerStyle={tw`my-4`}>
                <View style={[tw`overflow-hidden mr-4`, { borderRadius: 50 }]}>
                    <View style={[tw`border-2 overflow-hidden p-4 bg-blue-200 border-white`, { borderRadius: 50 }]}>
                        <AntDesign name="plus" size={24} color="#1E3A8A" />
                    </View>
                </View>
                <MomentItem />

            </ScrollView>
            <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-gray-700 text-lg mt-2 font-semibold`}>Latest</Text>
                <View style={tw`flex-1`} />
                <TouchableOpacity onPress={create_a_post} style={tw`bg-blue-100 p-2 rounded-full`}>
                    <AntDesign name="plus" size={16} color="#1E3A8A" />
                </TouchableOpacity>
                <TouchableOpacity onPress={filter_posts} style={tw`p-2`}>
                    <MaterialCommunityIcons name="tune" size={24} color="#374151" />
                </TouchableOpacity>
            </View>
            <View style={tw`my-4`}>
                {
                    posts?.map(post => (
                        <View key={post.id}>
                            <PostComponent
                                name={post.name}
                                post_body={post.post_body}
                                likes={post.likes}
                                comments={post.comments}
                                id={post.id}
                                time_posted={post.time_posted}
                                post_user_image={post.post_user_image}
                            />
                        </View>
                    ))
                }
            </View>
        </HomeLayout>
    )
}

export default Activity
