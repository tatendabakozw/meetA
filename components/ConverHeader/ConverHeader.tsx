import React from 'react'
import {StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import UserAvatar from '../UserAvatar/UserAvatar';
import Username from '../Username/Username';

interface Props{
    navigation ?: any,
    back_location ?: () => void,
    username?: string,
    propic ?: any
}

const ConverHeader = ({back_location, username, propic}:Props) => {
    return (
        <View style={styles.converheader}>
            <StatusBar style="auto" />
            <View style={styles.converheader__left}>
                <TouchableOpacity activeOpacity={0.7} onPress={back_location} style={styles.converheader__backIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <UserAvatar picture={propic} user_id={'aim an id'} />
                    <Username name={username} fontWeight="700" fontSize={17} />
                </TouchableOpacity>
                <View style={{flex:1}} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{marginRight: 10}}>
                        <Feather name="phone-call" size={18} style={tw`text-blue-900`} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 10}}>
                        <Feather name="video" size={20} style={tw`text-blue-900`} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ConverHeader

const styles = StyleSheet.create({
    converheader:{
        paddingBottom: 20,
        paddingTop: 35,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    converheader__left:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    },
    homechat__imgContainer:{
        padding: 5,
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    converheader__backIcon:{
        borderRadius: 50,
        paddingRight:10 
    }
})
