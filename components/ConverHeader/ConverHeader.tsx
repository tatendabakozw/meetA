import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const ConverHeader = () => {
    const history = useHistory()
    return (
        <View style={styles.converheader}>
            <StatusBar style="auto" />
            <View style={styles.converheader__left}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=> history.push('/chats')} style={styles.converheader__backIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.homechat__imgContainer}>
                        <Image source={require('../../assets/imgs/man.png')} style={{ width: 35, height: 35 }} />
                        
                    </View>
                    <Text style={{fontSize:18, color: '#374151'}}>Tatenda Bako</Text>
                </TouchableOpacity>
                <View style={{flex:1}} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{marginRight: 10}}>
                        <Feather name="phone-call" size={18} color="#5B61B9" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 10}}>
                        <Feather name="video" size={20} color="#5B61B9" />
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
        padding:10 
    }
})
