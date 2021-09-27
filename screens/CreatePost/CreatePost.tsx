import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import ExploreLayout from '../../layouts/ExploreLayout'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { get_current_set_user_Action } from '../../redux/actions/userActions'
import * as ImagePicker from 'expo-image-picker';
import { create_a_post_Action } from '../../redux/actions/postActions'

const CreatePost = () => {
    const navigation = useNavigation()
    const [body, setBody] = useState('')
    const [location, setLocation] = useState('')
    const [picture, setPicture] = useState<any>()
    const [preview_picture, setPreviewPicture] = useState<any>()
    // @ts-ignore
    const _user = useSelector(state => state.current_user)
    // @ts-ignore
    const _post = useSelector(state => state.create_post)
    const { post_loading, post_message, post_error } = _post
    const { loading, user } = _user
    const dispatch = useDispatch()

    const add_Picture = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.7,
            allowsMultipleSelection: true
        });
        if (!result.cancelled) {
            const blob: any = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", result.uri, true);
                xhr.send(null);
            });
            setPicture(blob)
            // Implement a new Blob promise with XMLHTTPRequest
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(blob)
            fileReaderInstance.onload = () => {
                const base64data = fileReaderInstance.result;
                setPreviewPicture(base64data)
            }
        }
    };

    const create_post = () => {
        if (!body && !picture) {
            console.log('you cant post empty stuff')
        } else {
            dispatch(create_a_post_Action(body, picture, location, user?.displayName, user?.token))
            setBody('')
            setPicture(null)
        }
    }


    useEffect(() => {
        dispatch(get_current_set_user_Action())
    }, [dispatch])

    if (loading) {
        return (
            <ExploreLayout>
                <View>
                    <Text>Loading ...</Text>
                </View>
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title={'Create Post'} header__back__activity={() => navigation.goBack()}>
            <View style={tw`flex flex-col bg-gray-50`}>
                <TextInput onChangeText={text => setBody(text)} placeholder="Anything intersting?" placeholderTextColor="gray" style={[tw`p-4 text-gray-500`, { fontSize: 20, lineHeight: 35 }]} multiline={true} />
                <View style={tw`flex flex-row items-center text-blue-900 self-end p-4`}>
                    <TouchableOpacity onPress={add_Picture} style={tw`px-4 py-2`}>
                        <Ionicons name="ios-image-outline" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-4 py-2`}>
                        <AntDesign name="adduser" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-4 py-2`}>
                        <Ionicons name="ios-location-outline" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                </View>
                <CustomButton loading={post_loading} button_action={create_post} button_text={'Post'} />
            </View>
            <View style={tw`relative bg-gray-50`}>
                <TouchableOpacity onPress={() => {
                    setPreviewPicture(null)
                    setPicture(null)
                }} style={tw`absolute top-2 right-10 bg-white p-2 z-20 rounded-full`}>
                    <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
                {
                    preview_picture && (
                        <View style={tw`flex flex-col w-full`}>
                            <Image
                                source={preview_picture ? { uri: preview_picture } : require('../../assets/imgs/placeholder.png')}
                                style={[tw`bg-white flex-1`, { height: 400, borderRadius: 25 }]} resizeMode="contain"
                            />

                        </View>
                    )
                }
            </View>
        </ExploreLayout>
    )
}

export default CreatePost

const styles = StyleSheet.create({})
