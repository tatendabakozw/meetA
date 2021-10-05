import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import UserAvatar from '../UserAvatar/UserAvatar'
import Username from '../Username/Username'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/core'

interface Props {
    propic?: any,
    name: string,
    online_status: string,
    message: string,
    time: number,
    id?: number,
    verified?: boolean,
    room_id?: string,
    chat_users?: any,
    current_user_id?: string,
    sent_by_you?: string
}


const HomeChat = ({ propic, name, message, time, id, verified, room_id, chat_users, current_user_id, sent_by_you }: Props) => {
    const navigation = useNavigation()
    const enter_chat = () => {
        navigation.navigate('conversation', { id1: chat_users[1], id2: chat_users[0], name: name, propic: propic })
    }

    return (
        <View style={styles.homechat}>
            <View>
                {/* <Image source={require('../../assets/imgs/woman.png')} style={{ width: 45, height: 45 }} /> */}
                <UserAvatar user_id={'iam an id'} picture={propic} size='lg' />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={enter_chat} style={styles.homechat__texts}
            >
                <View style={tw`flex-row items-center`}>
                    <Username name={name} verified={verified} fontWeight="700" fontSize={17} />
                </View>
                {
                    !sent_by_you ? (
                        <View style={tw`flex flex-row items-center`}>
                            <Text style={tw`text-gray-500 font-bold`}>You: </Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.homechat__message}>{message}</Text>
                        </View>

                    ) : (

                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.homechat__message}>{message}</Text>
                    )
                }
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <Text style={{ color: '#6B7280' }}>{moment(time).fromNow(true)}</Text>
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
        width: 300
    }
})
