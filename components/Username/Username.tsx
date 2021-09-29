import React from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Props {
    verified ?: boolean,
    fontSize ?: number,
    fontWeight ?: string,
    name ?: string
}

const Username = ({verified, fontSize, fontWeight, name}:Props) => {
    return (
        <View style={tw`flex flex-row items-center`}>
            <Text style={[tw`text-gray-900 mr-2`, { fontSize: fontSize ? fontSize : 15, fontWeight: fontWeight ? fontWeight : '500' }]}>{name}</Text>
            {verified && <MaterialIcons name="verified" size={20} color="#1E3A8A" />}
        </View>
    )
}

export default Username