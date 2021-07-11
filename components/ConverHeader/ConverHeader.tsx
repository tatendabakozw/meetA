import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'

const ConverHeader = () => {
    const history = useHistory()
    return (
        <View>
            <Text></Text>
            <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10}} onPress={()=> history.push('/')}>
                <Text style={{color: 'white', textAlign: 'center'}}>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConverHeader

const styles = StyleSheet.create({})
