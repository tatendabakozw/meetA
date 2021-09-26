import React from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Props {
    verified ?: boolean,
    fontSize ?: string,
    fontWeight ?: string
}

const Username = ({verified, fontSize, fontWeight}:Props) => {
    return (
        <View style={tw`flex flex-row items-center`}>
            <Text style={[tw`text-gray-900 mr-2`, { fontSize: fontSize ? fontSize : 15, fontWeight: fontWeight ? fontWeight : '500' }]}>Tatenda Bako</Text>
            {verified && <MaterialIcons name="verified" size={20} color="#1E3A8A" />}
        </View>
    )
}

export default Username