import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MomentItem from '../MomentItem/MomentItem';
import tw from 'tailwind-react-native-classnames';

const Moments = () => {
    return (
        <View>
            <ScrollView horizontal contentContainerStyle={tw`my-4`}>
                <View style={[tw`overflow-hidden mr-4`, { borderRadius: 50 }]}>
                    <View style={[tw`border-2 overflow-hidden p-4 bg-blue-100 border-white`, { borderRadius: 50 }]}>
                        <AntDesign name="plus" size={24} color="#1E3A8A" />
                    </View>
                </View>
                <MomentItem />
            </ScrollView>
        </View>
    )
}

export default Moments

const styles = StyleSheet.create({})