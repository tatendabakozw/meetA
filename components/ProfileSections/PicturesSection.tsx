import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import * as ImagePicker from 'expo-image-picker';
import RedButton from '../../components/CustomButtons/RedButton'
import CustomButton from '../../components/CustomButtons/CustomButton'
import { useDispatch, useSelector } from 'react-redux';
import { add_picture_Action } from '../../redux/actions/userActions';
import { auth } from '../../firebase';
import Error from '../Alerts/Error';
import SucCess from '../Alerts/Success';

interface Props {
    user?: any
}

const PicturesSection = ({ user }: Props) => {
    const [profile__preview, setProfilePreview] = useState<any>()
    const [new_bio_picture, setNewBioPicture] = useState<any>(null);
    const [edit_profile, setEditProfile] = useState(false)
    // @ts-ignore
    const _picture = useSelector(state => state.add_picture)
    const { loading, error, message } = _picture
    const dispatch = useDispatch()

    function getRandomString(length: any) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const add_Picture = async () => {
        setEditProfile(true)
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.7,
        });

        if (!result.cancelled) {
            const blob: Blob = await new Promise((resolve, reject) => {
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
            setNewBioPicture(blob)
            // Implement a new Blob promise with XMLHTTPRequest
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(blob)
            fileReaderInstance.onload = () => {
                const base64data = fileReaderInstance.result;
                // console.log(base64data);
                setProfilePreview(base64data)
            }
        }
    };

    const add_picture_handler = () => {
        dispatch(add_picture_Action(auth.currentUser?.uid, new_bio_picture, getRandomString(6)))
    }

    // console.log(user?.picture)

    return (
        <ScrollView style={tw`w-full py-4 mb-8`}>
            <View style={tw`flex-row items-center justify-between`}>
                {
                    edit_profile ? (
                        <>
                            <View style={tw`flex flex-col items-center w-full`}>
                                <Image source={{ uri: profile__preview }} style={[tw`mx-4 rounded`, { width: 200, height: 200 }]} />
                                <View style={tw`flex-row w-full justify-between items-center`}>
                                    <TouchableOpacity style={tw`w-2/5 ml-2`}>
                                        <RedButton button_text="Cancel" outline button_action={() => {
                                            setEditProfile(false)
                                        }} />
                                    </TouchableOpacity>
                                    <View style={tw`w-2/5 ml-2`}>
                                        <CustomButton
                                            button_text="Save Image"
                                            outline
                                            loading={loading}
                                            button_action={add_picture_handler}
                                        />
                                    </View>
                                </View>
                                {error && <Error error={error} />}
                                {message && <SucCess message={message} />}
                            </View>

                        </>
                    ) : (
                        <View style={tw`w-full flex flex-col`}>
                            <View style={tw`flex-row items-center justify-between w-full`}>
                                <Text style={tw`text-xl text-gray-700 font-semibold text-center`}>Pictures</Text>
                                <TouchableOpacity
                                    onPress={add_Picture}
                                    style={tw`ml-4`}>
                                    <MaterialIcons name="add-a-photo" size={24} color="#60A5FA" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal contentContainerStyle={tw`p-2`}>
                                {
                                    user?.picture?.length === 0 ? (
                                        <TouchableOpacity style={tw`h-28 flex flex-row items-center overflow-hidden rounded-lg my-4 mr-4 items-center`}>
                                            <Text style={tw`text-gray-500`}>You do not have any pictures in you account at the moment</Text>
                                        </TouchableOpacity>
                                    ) : (user?.picture.map((pic: any, index: any) => (
                                        <TouchableOpacity key={index} activeOpacity={0.7} style={tw`h-28 w-28 overflow-hidden rounded-lg my-4 mr-4 bg-gray-200`}>
                                            <Image source={{ uri: pic }} resizeMode="contain" style={{ height: 120, width: 120 }} />
                                        </TouchableOpacity>
                                    )))
                                }
                            </ScrollView>
                        </View>
                    )
                }

            </View>
        </ScrollView>
    )
}



export default PicturesSection