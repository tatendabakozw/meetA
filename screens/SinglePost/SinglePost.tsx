import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CommentComponent from '../../components/CommentComponent/CommentComponent'
import PostComponent from '../../components/PostComponent/PostComponent'
import { getData } from '../../helpers/async-storage'
import ExploreLayout from '../../layouts/ExploreLayout'
import { get_a_single_post_Action } from '../../redux/actions/postActions'

const posts = [
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

interface Props {
    route?: any
}

const SinglePost = ({ route }: Props) => {
    const navigation = useNavigation()
    const { id } = route.params
    // @ts-ignore
    const _post = useSelector(state => state.get_single_post)
    const { loading, post } = _post
    const dispatch = useDispatch()

    useEffect(() => {
        getData().then(res => {
            dispatch(get_a_single_post_Action(id, res.token))
        }).catch(err => {
            console.log(err)
        })
    }, [])

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
                <View key={post.id}>
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
                    />
                </View>

            </View>
            <View style={tw`bg-gray-100 rounded-lg p-2 w-full`}>
                <Text style={tw`text-lg text-gray-700 font-semibold pb-4`}>
                    Comments
                </Text>
                <View>
                    {
                        post?.post.comments < 1 ? (
                            <Text style={tw`text-gray-700 text-lg text-center`}>This post has no comments yet</Text>
                        ):(
                            <CommentComponent />
                        )
                    }
                </View>
            </View>
        </ExploreLayout>
    )
}

export default SinglePost

const styles = StyleSheet.create({})
