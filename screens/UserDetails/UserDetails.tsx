import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CustomButton from '../../components/CustomButtons/CustomButton'
import CustomLoading from '../../components/Loading/CustomLoading'
import ExploreLayout from '../../layouts/ExploreLayout'
import HomeLayout from '../../layouts/HomeLayout'
import { get_current_set_user_Action } from '../../redux/actions/userActions'

interface Props{
    route ?: any
}

const UserDetails = ({route}:Props) => {
    const { id } = route.params
    const dispatch = useDispatch()
    // @ts-ignore
    const _user = useSelector(state => state.current_user)
    const { loading, user } = _user
    const navigation = useNavigation()

    useEffect(() => {
        dispatch(get_current_set_user_Action(id))
    }, [])

    if (loading) {
        return (
            <ExploreLayout header_title={'loading..'} header__back__activity={()=> navigation.goBack()}>
                <CustomLoading />
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title={'Feeling lucky?'} header__back__activity={()=> navigation.goBack()} >
            {/* <Text>{JSON.stringify(user)}</Text> */}
            <View style={[tw`my-2 rounded-xl overflow-hidden min-h-full flex-1`, { borderRadius: 15, minHeight: 620 }]}>
                <ImageBackground
                    source={user?.photoURL ? { uri: user?.photoURL } : require('../../assets/imgs/placeholder.png')}
                    style={[tw`h-full w-full rounded-xl p-2`, { borderRadius: 15 }]}
                    resizeMode="cover"
                    blurRadius={20}>
                    <View style={[tw`flex flex-row w-full h-full`, {}]}>
                        <View style={tw` flex flex-col items-center w-full h-full bottom-0`}>
                            <View style={tw`flex-1`} />

                            <View style={tw`relative z-10 bottom-0 w-full bg-white p-4 h-3/4 bottom-0 flex flex-col items-center rounded-xl`}>
                                <View style={[tw`absolute z-20 -top-12 border-2 border-white overflow-hidden`, { borderRadius: 50 }]}>
                                    <Image
                                        source={user?.photoURL ? { uri: user?.photoURL } : require('../../assets/imgs/placeholder.png')}
                                        style={{ height: 100, width: 100 }}
                                        blurRadius={20}
                                    />
                                </View>
                                <View style={tw`pt-16 flex flex-col items-center w-full`}>
                                    <Text style={tw`text-xl text-gray-700 text-center`}>{user?.displayName}</Text>
                                    <Text style={tw`text-lg text-center text-gray-700 my-8`}>{user?.bio}</Text>
                                    <CustomButton button_text="Chat" button_action={() => navigation.navigate('conversation',{id: id})} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ExploreLayout>
    )
}

export default UserDetails

const styles = StyleSheet.create({})
