import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import UserAvatar from '../UserAvatar/UserAvatar';

interface Props {
    user: any
}

const HomeHeader = ({ user }: Props) => {

    const [search_on, setSearchOn] = useState('off')
    const navigation = useNavigation()

    const toggleSearch = () => {
        setSearchOn(search_on === 'off' ? 'on' : 'off')
    }

    return (
        <View style={tw`h-32 px-4 pb-2 pt-6 bg-white shadow-sm overflow-hidden`}>
            <StatusBar style="auto" />
            <View style={tw`px-2 flex flex-row items-center flex-1`}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('profile')} style={tw`flex-1`}>
                    <UserAvatar picture={user?.photoURL} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleSearch} style={[tw`bg-gray-200 p-2`,{ borderRadius: 50 }]}>
                    <AntDesign name="search1" size={24} color="#6B7280" />
                </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row w-full justify-between items-center`}>
                {
                    search_on === 'on' ? (
                        <View style={[tw`bg-gray-100 flex-1 rounded-full py-2 px-4`]}>
                            <TextInput placeholder="Search" />
                        </View>
                    ) : (
                        <>
                            <View style={tw`flex-1 flex-row items-center`}>
                                <TouchableOpacity onPress={() => navigation.navigate('chats')} activeOpacity={0.7} style={styles.header__colorItem}>
                                    <Text style={{ color: '#fff', fontSize: 13 }}>My Chats</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('chats')} activeOpacity={0.7} style={styles.header__colorItem}>
                                    <Text style={{ color: '#fff', fontSize: 13 }}>Followers</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} style={tw``}>
                                <Ionicons name="settings-outline" size={24} color="#4B5563" />
                            </TouchableOpacity>
                        </>
                    )
                }

            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    header__colorItem: {
        backgroundColor: '#1E3A8A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginRight: 10
    },
    header__nonecolrItem: {
        backgroundColor: '#f3f3f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginRight: 10
    },
    header__search: {
        backgroundColor: '#F9FAFB',
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 50,
        marginRight: 10,
        width: '100%'
    },
    header__searchInput: {

    }
})
