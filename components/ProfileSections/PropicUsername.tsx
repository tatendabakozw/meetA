import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import { auth } from '../../firebase'
import { logout_user } from '../../redux/actions/authActions'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import RedButton from '../../components/CustomButtons/RedButton'
import { edit_phone_Action, edit_profile_Action, edit_username_Action } from '../../redux/actions/userActions'
import Error from '../Alerts/Error'
import SucCess from '../Alerts/Success'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core'
import { getData } from '../../helpers/async-storage'

interface Props {
    user?: any
}

const PropicUsername = ({ user }: Props) => {
    const navigation = useNavigation()

    const [edit_phone, setEditPhone] = useState(false)
    const [new_phone, setNewPhoneNumber] = useState('')

    const [new_username, setNewUsername] = useState<any>()
    const [edit_username, setEditUsername] = useState(false)
    const dispatch = useDispatch()
    // @ts-ignore
    const edit_user = useSelector(state => state.edit_username)
    // @ts-ignore
    const edit_phone1 = useSelector(state => state.edit_phone)
    // @ts-ignore
    const _picture = useSelector(state => state.edit_profile)

    const { phone_loading, phone_error, phone_message } = edit_phone1
    const { profile_loading, profile_message, profile_error } = _picture
    const { loading, error, message } = edit_user

    //for profile picture
    const [profile__preview, setProfilePreview] = useState<any>()
    const [new_bio_picture, setNewBioPicture] = useState<any>(null);
    const [edit_profile, setEditProfile] = useState(false)

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

    const logout = () => {
        dispatch(logout_user())
        navigation.navigate('login')
    }

    const Edit_Username_Handler = () => {
        dispatch(edit_username_Action(auth.currentUser?.uid, new_username))
    }

    const edit_phone_handler = () => {
        dispatch(edit_phone_Action(auth.currentUser?.uid, new_phone))
    }

    const edit_profile_picture_handler = () => {
        dispatch(edit_profile_Action(auth.currentUser?.uid, new_bio_picture, getRandomString(8)))
    }

    return (
        <>
            <View style={tw`flex flex-row items-center w-full justify-between my-4`}>
                {
                    edit_profile ? (<TouchableOpacity onPress={add_Picture} activeOpacity={0.8} style={tw`w-1/3`} >
                        <View style={[tw`border-2 border-white`, { height: 100, width: 100, borderRadius: 50 }]}>
                            <Image
                                source={profile__preview ? { uri: profile__preview } : require('../../assets/imgs/placeholder1.png')}
                                style={[tw`rounded-full bg-white rounded-full`, { height: 100, width: 100, borderRadius: 50 }]} resizeMode="contain"
                            />
                        </View>

                    </TouchableOpacity>) : (<View style={tw`w-1/3`} >
                        <View style={[tw`relative`, { width: 110 }]}>
                            <View style={[tw`border-2 border-white`, { height: 100, width: 100, borderRadius: 50 }]}>
                                <Image
                                    source={user?.photoURL ? { uri: user?.photoURL } : require('../../assets/imgs/placeholder1.png')}
                                    style={[tw`rounded-full`, { height: 100, width: 100, borderRadius: 400 }]} resizeMode="contain"
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={add_Picture} style={[tw`absolute bottom-0 right-0 z-40 bg-gray-300 border-2 border-white p-2`, { borderRadius: 50 }]}>
                                <Ionicons name="camera" size={24} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>)
                }

                {/* //username */}
                <View style={tw`flex flex-col justify-between w-2/3`}>
                    <View style={tw`flex-row items-center mb-2 justify-between`}>
                        {
                            edit_username ? (
                                <TextInput
                                    placeholder="New username"
                                    // @ts-ignore
                                    defaultValue={user?.displayName}
                                    style={[tw`w-4/5`, styles.input]}
                                    numberOfLines={1}
                                    onChangeText={text => setNewUsername(text)} />
                            ) : (
                                <Text style={tw`text-gray-700 font-semibold text-xl`}>{user?.displayName ? user?.displayName : 'Username'}</Text>
                            )
                        }
                        <TouchableOpacity
                            onPress={() => {
                                setEditUsername(true)
                                setEditPhone(false)
                            }}
                            style={tw`ml-4`}>
                            <EvilIcons name="pencil" size={24} color="#60A5FA" />
                        </TouchableOpacity>
                    </View>

                    {/* //phone number */}
                    <View style={tw`flex-row items-center justify-between`}>

                        {
                            edit_phone ? (
                                <TextInput
                                    placeholder="new phonenumber"
                                    defaultValue={user?.phoneNumber}
                                    style={[tw`w-4/5`, styles.input]}
                                    numberOfLines={1}
                                    onChangeText={text => setNewPhoneNumber(text)} />
                            ) : (
                                <Text style={tw`text-gray-500 font-semibold`}>{user?.phoneNumber ? user?.phoneNumber : 'Your phone number'}</Text>
                            )
                        }
                        <TouchableOpacity
                            onPress={() => {
                                setEditPhone(true)
                                setEditUsername(false)
                            }}
                            style={tw`ml-4`}>
                            <EvilIcons name="pencil" size={24} color="#60A5FA" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* //logout button and save user info button */}
            <View style={tw` w-full`}>
                {
                    edit_username ? (<View style={tw`flex my-4 flex-col w-full`}><View style={tw`flex-row w-full justify-between items-center`}>
                        <TouchableOpacity style={tw`w-2/5 ml-2`}>
                            <RedButton button_text="Cancel" outline button_action={() => {
                                setEditUsername(false)
                            }} />
                        </TouchableOpacity>
                        <View style={tw`w-2/5 ml-2`}>
                            <CustomButton button_text="Save username" outline button_action={Edit_Username_Handler} loading={loading} />
                        </View>

                    </View>
                        {error && <Error error={error} />}
                        {message && <SucCess message={message} />}
                    </View>) : null
                }
            </View>
            {/* //logout button and save phone info button */}
            <View style={tw`w-full`}>
                {
                    edit_phone ? (<View style={tw`flex my-4  flex-col w-full`}><View style={tw`flex-row w-full justify-between items-center`}>
                        <TouchableOpacity style={tw`w-2/5 ml-2`}>
                            <RedButton button_text="Cancel" outline button_action={() => {
                                setEditPhone(false)
                            }} />
                        </TouchableOpacity>
                        <View style={tw`w-2/5 ml-2`}>
                            <CustomButton button_text="Save number" outline button_action={edit_phone_handler} loading={phone_loading} />
                        </View>

                    </View>
                        {phone_error && <Error error={phone_error} />}
                        {phone_message && <SucCess message={phone_message} />}
                    </View>) : null
                }
            </View>

            {/* //change profile picture buttons */}
            <View style={tw`w-full`}>
                {
                    edit_profile ? (<View style={tw`flex my-4  flex-col w-full`}><View style={tw`flex-row w-full justify-between items-center`}>
                        <TouchableOpacity style={tw`w-2/5 ml-2`}>
                            <RedButton button_text="Cancel" outline button_action={() => {
                                setEditProfile(false)
                            }} />
                        </TouchableOpacity>
                        <View style={tw`w-2/5 ml-2`}>
                            <CustomButton
                                button_text="Save picture"
                                loading={profile_loading}
                                button_action={edit_profile_picture_handler}
                            />
                        </View>

                    </View>
                        {error && <Error error={profile_error} />}
                        {message && <SucCess message={profile_message} />}
                    </View>) : null
                }
            </View>
            <CustomButton button_text="Logout" button_action={logout} />
        </>
    )
}

export default PropicUsername

const styles = StyleSheet.create({
    input: {
        // width: '100%',
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})
