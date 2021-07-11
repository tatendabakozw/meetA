import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ExploreItem from '../../components/ExploreItem/ExploreItem'
import HomeLayout from '../../layouts/HomeLayout'

const Explore = () => {
    return (
        <HomeLayout header_title="Explore">
            <View style={styles.explore}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20}}>
                    <View style={styles.buttons}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Shuffle</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Next</Text>
                    </View>
                </View>
                <View style={styles.explore__itemsContainer}>
                    <ExploreItem />
                    <ExploreItem />
                    <ExploreItem />
                    <ExploreItem />
                    <ExploreItem />
                    <ExploreItem />
                </View>
            </View>
        </HomeLayout>
    )
}

export default Explore

const styles = StyleSheet.create({
    explore:{
        flex:1
    },
    buttons:{
        backgroundColor: '#5B61B9',
        paddingVertical: 10,
        borderRadius: 50,
        paddingHorizontal: 20,
        width: '45%'
    },
    explore__itemsContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow:'scroll',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})
