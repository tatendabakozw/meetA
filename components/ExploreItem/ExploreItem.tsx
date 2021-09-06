import React from 'react'
import { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface Props {
    loading?: boolean,
    image?: any,
    user?: any
}

const ExploreItem = ({ loading, image, user }: Props) => {
    const navigation = useNavigation()

    return (
        <>
            {
                loading ? (<TouchableOpacity activeOpacity={0.8} style={[tw`flex-row items-center content-center`, styles.exploreitem]}>
                    <View style={tw`mx-auto`}>
                        <ActivityIndicator color="#9CA3AF" size="large" />
                    </View>
                </TouchableOpacity>) : (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('details',{id: user?.uid})} style={[tw``, styles.exploreitem]}>
                        <Image
                            source={{ uri: image }}
                            style={[tw`bg-gray-200`, styles.image]}
                            resizeMode="cover"
                            blurRadius={20}
                        />
                    </TouchableOpacity>
                )
            }
        </>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    exploreitem: {
        height: 150,
        width: '45%',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15
        // flex:1
    },
    bio: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E5E7EB',
        padding: 25,
        borderRadius: 15
    },
    bio__top: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    homechat__imgContainer: {
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex'
    },
})
