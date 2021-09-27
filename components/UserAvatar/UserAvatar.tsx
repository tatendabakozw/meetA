import React from 'react'
import { Image, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const UserAvatar = () => {
    return (
        <View style={[tw`overflow-hidden mr-2`, { borderRadius: 50 }]}>
            <View style={[tw`overflow-hidden h-12 w-12 border-white`, { borderRadius: 50 }]}>
                <Image source={require('../../assets/imgs/bako.jpg')} style={[tw`h-12 w-12`, { borderRadius: 50 }]} resizeMode="cover" />
            </View>
        </View>
    )
}

export default UserAvatar