import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Register_Pic from '../../assets/icons/Register_Pic'
import {Input} from 'react-native-elements'

interface Props {
    navigation :any
}

const Register = ({navigation}:Props) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
           headerShown: false
        })
    },[navigation])

    return (
        <View style={styles.register}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={styles.register__container}>
                <View style={styles.register__top}>
                    <Register_Pic height={250} width={250}/>
                </View>
                <View style={styles.register__bottom}>
                    <Text style={styles.register__heading}>
                        Register
                    </Text>
                    <Input placeholder="email" containerStyle={styles.register__input} />
                    <Input placeholder="password" containerStyle={styles.register__input} />
                    <TouchableOpacity style={styles.register__button}>
                        <Text style={{color: "white", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>SIGN UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={{color: "#5B61B9", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    register:{
        paddingTop: 30
    },
    register__container:{
        backgroundColor: '#f3f3f3',
        height: '100%'
    },
    register__top:{
        height: "35%",
        alignItems: 'center'
    },
    register__bottom:{
        backgroundColor: "#fff",
        height: "65%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 30,
        alignItems: 'center'
    },
    register__heading:{
        fontSize: 40,
        fontFamily: 'sans-serif',
        marginBottom: 15
    },
    register__input:{
        marginBottom: 15
    },
    register__button:{
        backgroundColor: "#5B61B9",
        width: '100%',
        padding: 15,
        borderRadius: 50,
        marginBottom: 20
    },
    registerSign__button:{}
})
