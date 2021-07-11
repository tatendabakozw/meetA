import React from 'react'
import { useState } from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, Text, View } from 'react-native'

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
                <View>
                    <TouchableOpacity onPress={() => setDescriptionModalOpen(false)}>
                        <Text>close</Text>
                    </TouchableOpacity>
                    <Text>Stuff goes here</Text>
                </View>
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
        // flex:1
    }
})
