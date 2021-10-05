import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import MomentItem from '../MomentItem/MomentItem';
import tw from 'tailwind-react-native-classnames';

interface Props{
    current_user ?: string
}

const Moments = ({current_user}:Props) => {
    return (
        <View>
            <ScrollView horizontal contentContainerStyle={tw`mt-4 mb-2`}>
                <TouchableOpacity activeOpacity={0.7} style={[tw`overflow-hidden mr-4`, { borderRadius: 50 }]}>
                    <View style={[tw`border-2 overflow-hidden p-4 bg-blue-100 border-white`, { borderRadius: 50 }]}>
                        <AntDesign name="plus" size={24} color="#1E3A8A" />
                    </View>
                </TouchableOpacity>
                <MomentItem />
            </ScrollView>
        </View>
    )
}

export default Moments