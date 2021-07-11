import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const HomeChat = () => {
    return (
        <View style={styles.homechat}>
            <View style={styles.homechat__imgContainer}>
                <Image source={require('../../assets/imgs/woman.png')} style={{ width: 45, height: 45 }} />
            </View>
            <View style={styles.homechat__texts}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.homechat__name}>Tatenda Bako</Text>
                    <View style={{padding: 5, backgroundColor:'#10B981', borderRadius: 50}}/>
                </View>
                <Text style={styles.homechat__message}>Urikumboita nezve mazuvano</Text>
            </View>
            <View style={{flex: 1}} />
            <Text style={{color: '#6B7280' }}>3m</Text>
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
        color: '#6B7280'
    }
})
