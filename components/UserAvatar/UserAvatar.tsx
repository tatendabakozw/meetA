import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'

interface Props {
    picture?: any,
    size?: string,
    user_id?: any
}

const UserAvatar = ({ picture, size, user_id }: Props) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('details', { id: user_id })} style={[tw`overflow-hidden mr-2`, { borderRadius: 50 }]}>
            {
                size === 'lg' ? (
                    <View style={[tw`overflow-hidden h-12 w-12 border-white`, { borderRadius: 50 }]}>
                        <Image source={picture ? { uri: picture } : require('../../assets/imgs/placeholder1.png')} style={[tw`h-12 w-12`, { borderRadius: 50 }]} resizeMode="cover" />
                    </View>
                ) : (
                    <View style={[tw`overflow-hidden`, { borderRadius: 50 }]}>
                        <Image source={picture ? { uri: picture } : require('../../assets/imgs/placeholder1.png')} style={[tw`h-10 w-10`, { borderRadius: 50 }]} resizeMode="cover" />
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

export default UserAvatar