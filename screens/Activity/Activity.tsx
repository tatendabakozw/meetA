import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import HomeLayout from '../../layouts/HomeLayout'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import PostComponent from '../../components/PostComponent/PostComponent';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_posts_Action } from '../../redux/actions/postActions';
import { getData } from '../../helpers/async-storage';

function Activity() {
    const navigation = useNavigation()
    // @ts-ignore
    const _posts = useSelector(state => state.all_posts)
    const {loading, posts} = _posts
    const dispatch = useDispatch()
    const [user, setUser] = useState()
 
    const filter_posts_ = () => {

    }
    useEffect(()=>{
        getData().then(res=>{
            setUser(res)
            dispatch(get_all_posts_Action(res.token))
        }).catch(err=>{
            console.log(err)
        })
        
    },[dispatch])

    if(loading){
        return(
            <HomeLayout>
                <View style={tw`my-40`}>
                    <ActivityIndicator size="large" color="#1E3A8A" />
                </View>
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
           
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
                                logged_in_user = {user}
                                liked={post.liked_post}
                                user_id={post.post_owner_id}
                            />
                        </View>
                    ))
                }
            </View>
        </HomeLayout>
    )
}

export default Activity
