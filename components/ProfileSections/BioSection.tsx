import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import { EvilIcons } from '@expo/vector-icons';
import RedButton from '../../components/CustomButtons/RedButton'
import { useDispatch, useSelector } from 'react-redux';
import SucCess from '../Alerts/Success';
import Error from '../Alerts/Error';
import { edit_bio_Action } from '../../redux/actions/userActions';
import { auth } from '../../firebase';

interface Props {
    user?: any
}

const BioSection = ({ user }: Props) => {
    const [new_bio, setNewBio] = useState<any>('')
    const [edit_bio, setEditBio] = useState(false)
    // @ts-ignore
    const _bio = useSelector(state => state.edit_bio)
    const { loading, error, message } = _bio
    const dispatch = useDispatch()

    const edit_bio_handler = () => {
        dispatch(edit_bio_Action(auth.currentUser?.uid, new_bio))
        setTimeout(() => {
            setNewBio(false)
        }, 1000);
    }

    return (
        <View style={tw`w-full`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-xl text-gray-700 font-semibold text-center`}>Bio</Text>
                <TouchableOpacity
                    onPress={() => setEditBio(!edit_bio ? true : false)}
                    style={tw`ml-4`}>
                    <EvilIcons name="pencil" size={24} color="#60A5FA" />
                </TouchableOpacity>
            </View>
            {
                edit_bio ? (
                    <View style={tw`flex flex-col w-full`}>
                        <TextInput
                            placeholder="Type your bio"
                            style={[tw`w-full rounded-lg border border-gray-300 p-2 mt-4`]}
                            onChangeText={text => setNewBio(text)}
                            multiline={true}
                        />
                        <View style={tw`flex-row w-full justify-between items-center`}>
                            <TouchableOpacity style={tw`w-2/5 ml-2`}>
                                <RedButton button_text="Cancel" outline button_action={() => setEditBio(false)} />
                            </TouchableOpacity>
                            <View style={tw`w-2/5 ml-2`}>
                                <CustomButton
                                    button_text="Save Bio"
                                    outline
                                    button_action={edit_bio_handler}
                                    loading={loading}
                                />
                            </View>
                        </View>
                        {error && <Error error={error} />}
                        {message && <SucCess message={message} />}
                    </View>
                ) : (<Text style={tw`text-gray-500 text-lg mt-4`}>{user?.bio ? user?.bio : 'Write something intersting about you here. People interested in you will see this bio'}</Text>)
            }
        </View>

    )
}

export default BioSection
