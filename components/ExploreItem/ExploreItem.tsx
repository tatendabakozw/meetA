import React from 'react'
import { useState } from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import HomeLayout from '../../layouts/HomeLayout'
import { Ionicons } from '@expo/vector-icons';
import ExploreLayout from '../../layouts/ExploreLayout';

const ExploreItem = () => {
    const [description_modal_open, setDescriptionModalOpen] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={()=> setDescriptionModalOpen(true)} style={styles.exploreitem}>
                <Image 
                    source={require('../../assets/imgs/bako.jpg')} 
                    style={styles.image} 
                    resizeMode="cover"
                    blurRadius ={20}
                />
            </TouchableOpacity>
            <Modal visible={description_modal_open}>
                <ExploreLayout header_title="Description" header__back__activity={()=> setDescriptionModalOpen(false)}>
                    <View style={{height:180, borderRadius:10, overflow: 'hidden', marginTop: 20}}>
                        <Image 
                            source={require('../../assets/imgs/bako.jpg')} 
                            style={styles.image} 
                            resizeMode="cover"
                            blurRadius ={20}
                        />
                    </View>
                    <Text style={{fontSize:30, marginVertical: 20, textAlign: 'center', color: '#374151'}}>Bio</Text>
                    <View style={styles.bio}>
                        <View style={styles.bio__top}>
                            <Text style={{color: '#374151', fontSize:15, textAlign: 'center'}} >
                                In publishing and graphic design, 
                                Lorem ipsum is a placeholder text commonly 
                                used to demonstrate the visual form of a document 
                                or a typeface without relying on meaningful content. 
                                Lorem ipsum may be used as 
                                a placeholder before final copy is available
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={{backgroundColor: '#5B61B9', borderRadius: 50, marginTop: 20, padding: 15}}>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>Chat</Text>
                    </TouchableOpacity>
                </ExploreLayout>
            </Modal>
        </>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    exploreitem:{
        height: 150,
        width: '45%',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB'
    },
    image:{
        height: '100%',
        width: '100%',
        borderRadius:15
        // flex:1
    },
    bio:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E5E7EB',
        padding: 25,
        borderRadius: 15
    },
    bio__top:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    homechat__imgContainer:{
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems:'center',
        display: 'flex'
    },
})
