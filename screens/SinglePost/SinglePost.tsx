import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import PostComponent from '../../components/PostComponent/PostComponent'
import { getData } from '../../helpers/async-storage'
import ExploreLayout from '../../layouts/ExploreLayout'
import { get_a_single_post_Action } from '../../redux/actions/postActions'
import { socket } from '../../helpers/socket'
import CommentsSection from '../../components/CommentsSection/CommentsSection'
import axios from 'axios'
import { apiUrl } from '../../helpers/apiUrl'

interface Props {
    route?: any
}

const SinglePost = ({ route }: Props) => {
    const navigation = useNavigation()
    const { id } = route.params
    const [token, setToken] = useState()
    // @ts-ignore
    const _post = useSelector(state => state.get_single_post)
    const { loading, post } = _post
    const dispatch = useDispatch()
    const mountedRef = useRef(true)
    const [comments, setComments] = useState<any>()
    const [comments_loading, setCommentsLoading] = useState(false)

    useEffect(() => {
        getData().then(res => {
            dispatch(get_a_single_post_Action(id, res.token))
            setToken(res.token)
        }).catch(err => {
            console.log(err)
        })
    }, [dispatch])

    const getComments = useCallback(async () => {
        try {
            const data = await axios.get(`${apiUrl}/comment/all/${id}`)
            if (!mountedRef.current) return null;
            setComments(data.data.comments)
        } catch (error) {
            console.log(error)
            setCommentsLoading(false)
        }
    }, [mountedRef])
    
    useEffect(() => {
        setCommentsLoading(true)
        getComments()
        setCommentsLoading(false)
        return () => { mountedRef.current = false }
    }, [])

    useEffect(() => {
        socket.on('commented', (body) => {
            setComments((old_comments: any) => [...old_comments, body])
        })
    }, [socket])

    if (loading || comments_loading) {
        return (
            <ExploreLayout header_title={"Loading..."} header__back__activity={() => navigation.goBack()}>
                <View style={tw`my-40`}>
                    <ActivityIndicator size="large" color="#1E3A8A" />
                </View>
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
                <View>
                    <CommentsSection token={token} loading={comments_loading} id={post?.post?._id} comments={comments} />
                </View>
            </View>
        </ExploreLayout>
    )
}

export default SinglePost

const styles = StyleSheet.create({})
