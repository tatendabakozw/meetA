import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'
import ConversationsLayout from '../../layouts/ConversationsLayout'
import { Ionicons } from '@expo/vector-icons';

const Conversation = () => {
    const history = useHistory()
    return (
        <ConversationsLayout>
            <View style={{padding: 20, flexDirection: 'column'}}>
                <View style={{alignSelf: 'flex-start'}}>
                    <MessageComponent/>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                    <OutgoingMessageComponent/>
                </View>
            </View>
        </ConversationsLayout>
    )
}

const MessageComponent = () =>{
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.homechat__imgContainer}>
                <Image source={require('../../assets/imgs/man.png')} style={{ width: 30, height: 30 }} />
            </View>
            <View style={{backgroundColor: '#c4c4c4', padding: 10, borderRadius: 50}}>
                <Text>Hi Tatenda Bako</Text>
            </View>
        </View>
    )
}

const OutgoingMessageComponent = () =>{
    return(
        <View style={{flexDirection: 'row', alignItems: 'center', right: 0}}>
            
            <View style={{backgroundColor: '#5B61B9', padding: 10, borderRadius: 50}}>
                <Text style={{color: 'white'}}>Yo! G wassup</Text>
            </View>
            <View style={styles.homechat__img}>
            <Ionicons name="checkmark-done-circle-outline" size={24} color="#60A5FA" />
            </View>
        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({
    homechat__imgContainer:{
        padding: 5,
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    homechat__img:{
        borderRadius: 50,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems:'center'
    }
})
