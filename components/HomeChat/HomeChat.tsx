import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import UserAvatar from '../UserAvatar/UserAvatar'
import Username from '../Username/Username'
import tw from 'tailwind-react-native-classnames'

interface Props {
    propic?: any,
    name: string,
    online_status: string,
    message: string,
    time: number,
    id?: number,
    verified?: boolean,
    room_id?: string,
    chat_users ?: any
}


const HomeChat = ({ propic, name, message, time, id, verified, room_id, chat_users }: Props) => {

    const enter_chat = () =>{
        console.log(room_id)
    }

    return (
        <View style={styles.homechat}>
            <View>
                {/* <Image source={require('../../assets/imgs/woman.png')} style={{ width: 45, height: 45 }} /> */}
                <UserAvatar user_id={'iam an id'} picture={propic} size='lg' />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log('pressed')} style={styles.homechat__texts}
            >
                <View style={tw`flex-row items-center`}>
                    <Username name={name} verified={verified} fontWeight="700" fontSize={17} />
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.homechat__message}>{message}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <Text style={{ color: '#6B7280' }}>{moment(time).fromNow()}</Text>
        </View>
    )
}

export default HomeChat

const styles = StyleSheet.create({
    homechat: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    homechat__imgContainer: {
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        overflow: 'hidden',
        height: 50,
        width: 50
    },
    homechat__texts: {
        display: 'flex',
        flexDirection: 'column'
    },
    homechat__name: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: 5,
        color: '#374151'
    },
    homechat__message: {
        fontSize: 14,
        color: '#6B7280',
        width: 320
    }
})
