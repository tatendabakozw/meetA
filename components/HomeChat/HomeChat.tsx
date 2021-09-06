import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    propic?: any,
    name: string,
    online_status: string,
    message: string,
    time: number,
    id?: number,
    location: string,
    pushingToPage: () => void
}


const HomeChat = ({ propic, name, online_status, message, time, id, pushingToPage }: Props) => {

    return (
        <View style={styles.homechat}>
            <View style={styles.homechat__imgContainer}>
                {/* <Image source={require('../../assets/imgs/woman.png')} style={{ width: 45, height: 45 }} /> */}
                <Image source={propic ? { uri: propic } : require('../../assets/imgs/placeholder.png')} style={{ width: 50, height: 50 }} resizeMode='contain' />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={pushingToPage} style={styles.homechat__texts}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.homechat__name}>{name}</Text>
                    {
                        online_status === 'online' ? (<View style={{ padding: 4, backgroundColor: '#10B981', borderRadius: 50, marginTop: 5 }} />) : (<View style={{ padding: 4, backgroundColor: '#F6954F', borderRadius: 50, marginTop: 5 }} />)
                    }
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.homechat__message}>{message}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <Text style={{ color: '#6B7280' }}>{Date.now() - time}</Text>
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
        width: 220
    }
})
