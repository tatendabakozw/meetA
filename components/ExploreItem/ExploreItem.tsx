import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ExploreItem = () => {
    return (
        <View style={styles.exploreitem}>
            <Text>item</Text>
        </View>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    exploreitem:{
        height: 180,
        backgroundColor: 'red',
        width: '45%',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden'
    }
})
