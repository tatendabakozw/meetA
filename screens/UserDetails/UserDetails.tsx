import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import CustomLoading from '../../components/Loading/CustomLoading'
import ExploreLayout from '../../layouts/ExploreLayout'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { get_current_set_user_Action } from '../../redux/actions/userActions'
// ts-ignore
import MasonryList from "react-native-masonry-list";

interface Props {
    route?: any
}

const UserDetails = ({ route }: Props) => {
    const { id } = route.params
    const dispatch = useDispatch()
    // @ts-ignore
    const _user = useSelector(state => state.current_user)
    const { loading, user } = _user
    const navigation = useNavigation()
    const [view_options, setViewOptions] = useState<string>('photos')

    useEffect(() => {
        dispatch(get_current_set_user_Action(id))
    }, [])

    if (loading) {
        return (
            <ExploreLayout header_title={'loading..'} header__back__activity={() => navigation.goBack()}>
                <CustomLoading />
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title={'Tatenda Bako'} header__back__activity={() => navigation.goBack()}>
            <View style={tw`flex flex-col items-center w-full pt-16`}>
                <Image
                    source={require('../../assets/imgs/bako.jpg')}
                    style={[tw`self-center`, { height: 100, width: 100, borderRadius: 50 }]}
                    resizeMode="cover"
                />
            </View>
            <View style={tw`flex flex-row items-center self-center pt-4`}>
                <Text style={tw`font-bold text-gray-700 text-lg text-center mr-2`}>@bako_tatenda</Text>
            <MaterialIcons name="verified" size={20} color="#1E3A8A" />
            </View>
            <View style={tw`flex flex-row items-center justify-between pt-8 px-20`}>
                <View style={tw`flex flex-col items-center`}>
                    <Text style={[tw`text-gray-700`, { fontWeight: '700', fontSize: 17 }]}>45</Text>
                    <Text style={tw`text-gray-400`}>Followers</Text>
                </View>
                <View style={tw`flex flex-col items-center`}>
                    <Text style={[tw`text-gray-700`, { fontWeight: '700', fontSize: 17 }]}>45</Text>
                    <Text style={tw`text-gray-400`}>Following</Text>
                </View><View style={tw`flex flex-col items-center`}>
                    <Text style={[tw`text-gray-700`, { fontWeight: '700', fontSize: 17 }]}>1.5k</Text>
                    <Text style={tw`text-gray-400`}>Posts</Text>
                </View>
            </View>
            <View style={tw`flex w-full flex-row items-center mt-8 px-20`}>
                <View style={tw`w-3/5`}>
                    <CustomButton button_text={'Follow'} />
                </View>
                <TouchableOpacity style={tw`bg-gray-200 rounded-full p-3 ml-2`}>
                    <Ionicons name="md-mail-outline" size={24} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-gray-200 rounded-full p-3 ml-2`}>
                    <AntDesign name="sharealt" size={24} color="#374151" />
                </TouchableOpacity>
            </View>
            <View style={tw`px-2 mt-8`}>
                <View style={tw`flex flex-row items-center p-2 bg-gray-200 rounded-xl`}>
                    <TouchableOpacity onPress={() => setViewOptions('photos')} style={tw`${view_options === 'photos' ? "bg-white " : "bg-gray-200 "} p-4 rounded-lg w-1/3`}>
                        <Text style={[tw`text-gray-700 text-center`, { fontWeight: '700', }]}>Photos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setViewOptions('videos')} style={tw`${view_options === 'videos' ? "bg-white " : "bg-gray-200 "} p-4 rounded-lg w-1/3`}>
                        <Text style={[tw`text-gray-700 text-center`, { fontWeight: '700', }]}>Videos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setViewOptions('tagged')} style={tw`${view_options === 'tagged' ? "bg-white " : "bg-gray-200 "} p-4 rounded-lg w-1/3`}>
                        <Text style={[tw`text-gray-700 text-center`, { fontWeight: '700' }]}>Tagged</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={tw`mt-8 bg-gray-50 rounded-xl`}>
                <MasonryList
                    imageContainerStyle={{ borderRadius: 12, backgroundColor: 'white' }}
                    listContainerStyle={{ backgroundColor: '#F9FAFB', borderWidth: 0, borderColor: 'red' }}
                    columns={3}
                    spacing={2}
                    backgroundColor="#F9FAFB"
                    onPressImage={() => { navigation.navigate('singlepost') }}
                    images={[
                        {
                            uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
                            dimensions: { width: 1080, height: 1920 }
                        },
                        {
                            URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                            id: "blpccx4cn"
                        },
                        { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                        { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                        { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                        {
                            source: require("../../assets/imgs/man.png"),
                            dimensions: { width: 1080, height: 1920 }
                        },

                        {
                            source: require("../../assets/imgs/bako.jpg"),
                            dimensions: { width: 1080, height: 1440 }
                        },
                    ]}
                />
            </ScrollView>
        </ExploreLayout>
    )
}

export default UserDetails

const styles = StyleSheet.create({})
