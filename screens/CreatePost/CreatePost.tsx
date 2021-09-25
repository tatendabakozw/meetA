import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import ExploreLayout from '../../layouts/ExploreLayout'
import { Ionicons, AntDesign } from '@expo/vector-icons';

const CreatePost = () => {
    const navigation = useNavigation()
    return (
        <ExploreLayout header_title={'Create Post'} header__back__activity={() => navigation.goBack()}>
            <View style={tw`flex flex-col`}>
                <TextInput placeholder="Anything intersting?" placeholderTextColor="gray" style={[tw`p-4 text-gray-500`, { fontSize: 20, lineHeight: 35 }]} multiline={true} />
                <View style={tw`flex flex-row items-center text-blue-900 self-end p-4`}>
                    <TouchableOpacity style={tw`px-4 py-2`}>
                        <Ionicons name="ios-image-outline" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-4 py-2`}>
                        <AntDesign name="adduser" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-4 py-2`}>
                        <Ionicons name="ios-location-outline" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                </View>
                <CustomButton button_text={'Post'} />
            </View>
        </ExploreLayout>
    )
}

export default CreatePost

const styles = StyleSheet.create({})
