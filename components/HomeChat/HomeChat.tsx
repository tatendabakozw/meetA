import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props{
    propic ?: any,
    name : string,
    online_status : string,
    message : string,
    time : string,
    id ?: number
}

const HomeChat = ({propic, name, online_status, message, time, id}:Props) => {
    return (
        <View style={styles.homechat}>
            <View style={styles.homechat__imgContainer}>
                {/* <Image source={require('../../assets/imgs/woman.png')} style={{ width: 45, height: 45 }} /> */}
                <Image source={propic} style={{ width: 45, height: 45 }} />
            </View>
            <View style={styles.homechat__texts}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.homechat__name}>{name}</Text>
                    {
                        online_status === 'online' ? (<View style={{padding: 5, backgroundColor:'#10B981', borderRadius: 50, marginTop:5}}/>):(<View style={{padding: 5, backgroundColor:'#F6954F', borderRadius: 50, marginTop:5}}/>)
                    }
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.homechat__message}>{message}</Text>
            </View>
            <View style={{flex: 1}} />
            <Text style={{color: '#6B7280' }}>{time}</Text>
        </View>
    )
}

export default HomeChat

const styles = StyleSheet.create({
    homechat:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    homechat__imgContainer:{
        padding: 8,
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10
    },
    homechat__texts:{
        display: 'flex',
        flexDirection: 'column'
    },
    homechat__name:{
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#374151'
    },
    homechat__message:{
        color: '#6B7280',
        width: 210
    }
})
