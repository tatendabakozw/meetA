import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CommentComponent from '../../components/CommentComponent/CommentComponent'
import PostComponent from '../../components/PostComponent/PostComponent'
import { getData } from '../../helpers/async-storage'
import ExploreLayout from '../../layouts/ExploreLayout'
import { get_a_single_post_Action } from '../../redux/actions/postActions'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { create_a_comment_Action } from '../../redux/actions/commentActions'

interface Props {
    route?: any
}

const SinglePost = ({ route }: Props) => {
    const navigation = useNavigation()
    const { id } = route.params
    const [token, setToken] = useState()
    const [body, setBody] = useState('')
    // @ts-ignore
    const _post = useSelector(state => state.get_single_post)
    const { loading, post } = _post
    const dispatch = useDispatch()

    useEffect(() => {
        getData().then(res => {
            dispatch(get_a_single_post_Action(id, res.token))
            setToken(res.token)
        }).catch(err => {
            console.log(err)
        })
    }, [dispatch])

    const create_comment = () => {
        dispatch(create_a_comment_Action(id, token, body))
    }

    if (loading) {
        return (
            <ExploreLayout header_title={"Loading..."} header__back__activity={() => navigation.goBack()}>
                <Text>loading ...</Text>
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title={'Single Post'} header__back__activity={() => navigation.goBack()}>
            <View style={tw`w-full mt-8`}>
                <View>
                    <PostComponent
                        name={post?.post_owner.displayName}
                        post_body={post?.post.body}
                        likes={post?.post.likes.length}
                        comments={post?.post.comments.length}
                        id={post?.post._id}
                        time_posted={post?.post.createdAt}
                        post_user_image={post?.post_owner.photoURL}
                        verified={post?.post_owner.verified}
                        liked={post?.post_owner.liked_post}
                        post_picture={post?.post.pictureUrl}
                        user_id={post?.post_owner._id}
                    
                    />
                </View>

            </View>
            <View style={tw`bg-gray-100 rounded-lg p-2 w-full`}>
                <View style={tw`flex flex-row items-center`}>
                    <TextInput onChangeText={text => setBody(text)} placeholder="Write a comment" style={tw`rounded-lg bg-white p-2 flex-1 text-lg`} multiline={true} />
                    <TouchableOpacity onPress={create_comment} activeOpacity={0.7} style={tw`p-2`}>
                        <Ionicons name="send" size={24} style={tw`text-gray-700`} />
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-lg text-gray-700 font-semibold py-4`}>
                    Comments
                </Text>
                <View>
                    {
                        post?.comments < 1 ? (
                            <Text style={tw`text-gray-700 text-lg text-center`}>This post has no comments yet</Text>
                        ) : (
                            <>
                                {post?.comments.map((comment: any, index: any) => (
                                    <CommentComponent
                                        body={comment.comment_body}
                                        user_pic={comment.comment_owner_picture}
                                        username={comment.comment_owner_name}
                                        verified={comment.comment_owner_verified}
                                        liked_post={true}
                                    key={index} />
                                ))}
                            </>
                        )
                    }
                </View>
            </View>
        </ExploreLayout>
    )
}

export default SinglePost

const styles = StyleSheet.create({})
