import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ConversationsLayout from '../../layouts/ConversationsLayout'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    navigation?: any,
    route ?: any
}

const Conversation = ({ navigation, route }: Props) => {
    const {id} = route.params
    return (
        <ConversationsLayout back_location={() => navigation.goBack()} id={id}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#D1FAE5', borderRadius: 50, padding: 10, width: '45%', marginVertical: 10, borderWidth: 1, borderColor: '#047857' }}>
                        <Text style={{ color: '#047857', textAlign: 'center' }}>APPROVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#FEE2E2', borderRadius: 50, padding: 10, width: '45%', marginVertical: 10, borderWidth: 1, borderColor: '#F87171' }}>
                        <Text style={{ color: '#B91C1C', textAlign: 'center' }}>DISAPPROVE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'flex-start' }}>
                    <MessageComponent />
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <OutgoingMessageComponent />
                </View>
            </View>
        </ConversationsLayout>
    )
}

const MessageComponent = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.homechat__imgContainer}>
                <Image source={require('../../assets/imgs/man.png')} style={{ width: 30, height: 30 }} />
            </View>
            <View style={{ backgroundColor: '#c4c4c4', padding: 10, borderRadius: 50 }}>
                <Text>Hi Tatenda Bako</Text>
            </View>
        </View>
    )
}

const OutgoingMessageComponent = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', right: 0 }}>

            <View style={{ backgroundColor: '#5B61B9', padding: 10, borderRadius: 50 }}>
                <Text style={{ color: 'white' }}>Yo! G wassup</Text>
            </View>
            <View style={styles.homechat__img}>
                <Ionicons name="checkmark-done-circle-outline" size={24} color="#60A5FA" />
            </View>
        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({
    homechat__imgContainer: {
        padding: 5,
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    homechat__img: {
        borderRadius: 50,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
