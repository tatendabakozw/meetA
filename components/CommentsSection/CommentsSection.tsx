import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import CommentComponent from '../CommentComponent/CommentComponent';
import { create_a_comment_Action } from '../../redux/actions/commentActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../helpers/apiUrl';
import { getData } from '../../helpers/async-storage';

interface Props {
    id: string,
    token: any,
    comments?: any,
    loading ?: any
}

const CommentsSection = ({ token, id, comments, loading }: Props) => {
    const [body, setBody] = useState('')
    const dispatch = useDispatch()   

    const create_comment = () => {
        dispatch(create_a_comment_Action(id, token, body))
        setBody('')
    }

    if (loading) {
        return (
            <View style={tw`bg-gray-100 rounded-lg p-2 w-full`}>
                <Text>Loading ...</Text>
            </View>
        )
    }


    return (
        <View>
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
                        comments?.length < 1 ? (
                            <Text style={tw`text-gray-700 text-lg text-center`}>This post has no comments yet</Text>
                        ) : (
                            <>
                                {comments?.map((comment: any, index: any) => (
                                    <CommentComponent
                                        body={comment.body}
                                        user_pic={comment.pictureUrl}
                                        username={comment.displayName}
                                        verified={comment.comment_owner_verified}
                                        liked_post={true}
                                        key={index} />
                                ))}
                            </>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default CommentsSection

const styles = StyleSheet.create({})
