import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import Login_Pic from '../../assets/icons/Login_Pic'
import {Input} from 'react-native-elements'
import { useHistory } from 'react-router-native'

interface Props {}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    return (
        <View style={styles.login}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={styles.login__container}>
                <View style={styles.login__top}>
                    <Login_Pic height={250} width={250}/>
                </View>
                <View style={styles.login__bottom}>
                    <Text style={styles.login__heading}>
                        Login
                    </Text>
                    {/* <Input 
                        placeholder="email" 
                        // autoFocus
                        value={email}
                        onChangeText={text => setEmail(text)}
                        containerStyle={styles.login__input} /> */}
                    <TouchableOpacity style={styles.google__auth}>
                        <Image source={require('../../assets/icons/google.png')} style={{ width: 25, height: 25, borderRadius:50, marginRight: 10 }} />
                        <Text style={{color: 'white', fontSize: 20}}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.facebook__auth}>
                        <Image source={require('../../assets/icons/facebook.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <Text style={{color: '#5B61B9', fontSize: 20}}>Facebook</Text>
                    </TouchableOpacity>

                    

                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    login:{
        paddingTop: 30,
        backgroundColor: '#F3F4F6'
    },
    login__container:{
        height: '100%'
    },
    login__top:{
        height: "35%",
        alignItems: 'center',
        backgroundColor:"#F3F4F6"
    },
    login__bottom:{
        backgroundColor: "#fff",
        height: "65%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 30,
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: '25%'
    },
    login__heading:{
        fontSize: 40,
        marginBottom: 15,
        color: '#374151'
    },
    login__input:{
        marginBottom: 15
    },
    login__button:{
        backgroundColor: "#5B61B9",
        width: '100%',
        padding: 15,
        borderRadius: 50,
        marginBottom: 20
    },
    loginSign__button:{},
    google__auth:{
        marginVertical: 15,
        backgroundColor: "#5B61B9",
        width: '100%',
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    facebook__auth:{
        marginVertical: 15,
        backgroundColor: "#fff",
        width: '100%',
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "#5B61B9",
        borderWidth: 1
    }
    
})
