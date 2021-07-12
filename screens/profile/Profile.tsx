import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router-native'
import { auth } from '../../firebase'
import HomeLayout from '../../layouts/HomeLayout'

const Profile = () => {

    const history = useHistory()

    const logout = () =>{
        auth.signOut()
        history.push('/')
    }

    return (
        <HomeLayout>
            <Text>Profile page</Text>
            <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10}} onPress={logout}>
                <Text style={{color: 'white', textAlign: 'center'}}>logout</Text>
            </TouchableOpacity>
        </HomeLayout>
    )
}

export default Profile

const styles = StyleSheet.create({})
