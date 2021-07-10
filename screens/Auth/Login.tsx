import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Login_Pic from '../../assets/icons/Login_Pic'
import {Input} from 'react-native-elements'

interface Props {
    navigation :any
}

const Login = ({navigation}:Props) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
           headerShown: false
        })
    },[navigation])

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
                    <Input placeholder="email" containerStyle={styles.login__input} />
                    <Input placeholder="password" containerStyle={styles.login__input} />
                    <TouchableOpacity style={styles.login__button}>
                        <Text style={{color: "white", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{color: "#5B61B9", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    login:{
        paddingTop: 30
    },
    login__container:{
        backgroundColor: '#f3f3f3',
        height: '100%'
    },
    login__top:{
        height: "35%",
        alignItems: 'center'
    },
    login__bottom:{
        backgroundColor: "#fff",
        height: "65%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 30,
        alignItems: 'center'
    },
    login__heading:{
        fontSize: 40,
        fontFamily: 'sans-serif',
        marginBottom: 15
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
    loginSign__button:{}
    
})
