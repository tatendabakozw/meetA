import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import Login_Pic from '../../assets/icons/Login_Pic'

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
                    <Text>
                        bottom
                    </Text>
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
        padding: 20
    }
    
})
