import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import { EvilIcons } from '@expo/vector-icons';
import RedButton from '../../components/CustomButtons/RedButton'
import { useDispatch, useSelector } from 'react-redux';
import Error from '../Alerts/Error';
import SucCess from '../Alerts/Success';
import { edit_gender_Action } from '../../redux/actions/userActions';
import { auth } from '../../firebase';

interface Props {
    user?: any
}

const GenderSections = ({ user }: Props) => {
    const [new_gender, setNewGener] = useState<any>('')
    const [edit_gender, setEditGender] = useState(false)
    // @ts-ignore
    const _gender = useSelector(state => state.edit_gender)
    const { loading, error, message } = _gender
    const dispatch = useDispatch()

    const edit_gender_handler = () => {
        dispatch(edit_gender_Action(auth.currentUser?.uid, new_gender.toLowerCase().trim()))
    }

    return (
        <View style={tw`w-full`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-xl text-gray-700 font-semibold text-center`}>Gender</Text>
                <TouchableOpacity
                    onPress={() => setEditGender(!edit_gender ? true : false)}
                    style={tw`ml-4`}>
                    <EvilIcons name="pencil" size={24} color="#60A5FA" />
                </TouchableOpacity>
            </View>
            {
                edit_gender ? (
                    <>
                        <TextInput
                            placeholder="Enter you gender"
                            style={[tw`w-full rounded-lg border border-gray-300 p-2 mt-4`]}
                            numberOfLines={1}
                            onChangeText={text => setNewGener(text)} />
                        <View style={tw`flex flex-col w-full`}>
                            <View style={tw`flex-row w-full justify-between items-center`}>
                                <TouchableOpacity style={tw`w-2/5 ml-2`}>
                                    <RedButton button_text="Cancel" outline button_action={() => setEditGender(false)} />
                                </TouchableOpacity>
                                <View style={tw`w-2/5 ml-2`}>
                                    <CustomButton
                                        button_text="Save gender"
                                        outline
                                        loading={loading}
                                        button_action={edit_gender_handler}
                                    />
                                </View>
                            </View>
                            {error && <Error error={error} />}
                            {message && <SucCess message={message} />}
                        </View>
                    </>
                ) : (<Text style={tw`text-gray-500 text-lg mt-4`}>{user?.gender ? user?.gender : 'Provide your gender so that we can customise you interests more accurately'}</Text>)
            }
        </View>
    )
}

export default GenderSections