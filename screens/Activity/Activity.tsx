import React, {useEffect} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import HomeLayout from '../../layouts/HomeLayout'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import PostComponent from '../../components/PostComponent/PostComponent';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_posts_Action } from '../../redux/actions/postActions';

function Activity() {
    const navigation = useNavigation()
    // @ts-ignore
    const _posts = useSelector(state => state.all_posts)
    const {loading, posts} = _posts
    const dispatch = useDispatch()
 
    const posts_ = [
        {
            id: '1',
            name: 'Tatenda Bako',
            time_posted: '5 mins',
            post_body: 'This is the first post on this app.  Enjoy your dating!  \n \nUse comments below as feedback. Leave your comments below on what you wish should be added, removed or altered to this platform.',
            likes: 10,
            comments: 25,
            post_user_image: '../../assets/imgs/bako.jpg'

        }
    ]

    const filter_posts_ = () => {

    }
    useEffect(()=>{
        dispatch(get_all_posts_Action())
    },[dispatch])

    console.log(posts)

    if(loading){
        return(
            <HomeLayout>
                <Text>loading...</Text>
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
            {/* <Text style={tw`text-gray-700 text-lg mt-2 font-semibold`}>Moments</Text> */}
            {/* <View style={tw`bg-white p-2 w-full rounded-xl mt-2 flex-row`}>
                <UserAvatar />
                <View style={tw`flex flex-row bg-gray-50 flex-1 p-2 items-center`}>
                    <TextInput multiline={true} style={tw` rounded-lg flex-1 px-2 text-lg`} placeholder="What's on your mind" />
                    <TouchableOpacity style={tw`text-gray-700`}>
                        <Entypo name="attachment" size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={tw`flex flex-row items-center mt-4 mx-4`}>
                <Text style={tw`text-gray-700 text-lg mt-2 font-semibold`}>Latest</Text>
                <View style={tw`flex-1`} />
                <TouchableOpacity onPress={() => navigation.navigate('createpost')} style={tw`bg-blue-100 p-2 rounded-full`}>
                    <AntDesign name="plus" size={16} color="#1E3A8A" />
                </TouchableOpacity>
                <TouchableOpacity onPress={filter_posts_} style={tw`p-2`}>
                    <MaterialCommunityIcons name="tune" size={24} color="#374151" />
                </TouchableOpacity>
            </View>
            <View style={tw`my-4`}>
                {
                    posts?.map((post: any) => (
                        <View key={post._id}>
                            <PostComponent
                                name={post.post_owner_username}
                                post_body={post.post_body}
                                likes={post.post_liked_length}
                                comments={post.post_comments_length}
                                id={post._id}
                                time_posted={post.createdAt}
                                post_user_image={post.post_owner_pic}
                                post_picture = {post.pictureUrl}
                                verified={post.post_owner_verified}
                            />
                        </View>
                    ))
                }
            </View>
        </HomeLayout>
    )
}

export default Activity
