import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ExploreItem = () => {
    return (
        <View style={styles.exploreitem}>
            <Image 
                source={require('../../assets/imgs/bako.jpg')} 
                style={styles.image} 
                resizeMode="cover"
                blurRadius ={20}
            />
        </View>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    exploreitem:{
        height: 180,
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
