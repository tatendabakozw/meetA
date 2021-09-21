import React from 'react'
import { Image, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const MomentItem = () => {
    return (
        <View style={[tw`border-2 overflow-hidden border-blue-700 mr-2`, { borderRadius: 50 }]}>
            <View style={[tw`border overflow-hidden h-16 w-16 border-white`, { borderRadius: 50 }]}>
                <Image source={require('../../assets/imgs/man.png')} blurRadius={10} style={[tw`h-16 w-16`, { borderRadius: 50 }]} resizeMode="cover" />
            </View>
        </View>
    )
}

export default MomentItem