import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import PostComponent from '../../components/PostComponent/PostComponent'
import ExploreLayout from '../../layouts/ExploreLayout'

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

const SinglePost = () => {
    return (
        <ExploreLayout header_title={'Single Post'}>
            <View style={tw`w-full mt-8`}>
                {
                    posts?.map((post: any) => (
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
        </ExploreLayout>
    )
}

export default SinglePost

const styles = StyleSheet.create({})
