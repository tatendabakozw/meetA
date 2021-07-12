import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import Login_Pic from '../../assets/icons/Login_Pic'
import {Input} from 'react-native-elements'
import { useHistory } from 'react-router-native'
import { auth } from '../../firebase'

interface Props {}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(auth_user=>{
            if(auth_user){
                history.push('/chats')
            }
        })

        return unsubscribe;
    },[])

    const loginWIthCredentials = () =>{
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password).then(auth_user=>{
            console.log(auth_user)
        }).finally(()=>{
            setLoading(false)
            history.push('/')
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}>
            <StatusBar style="auto" />
            <View style={styles.login__container}>
                <View style={styles.login__top}>
                    <Login_Pic height={250} width={250}/>
                </View>
                <View style={styles.login__bottom}>
                    <Text style={styles.login__heading}>
                        Login
                    </Text>
                    <Input 
                        placeholder="email" 
                        value={email}
                        onChangeText={text => setEmail(text)}
                        containerStyle={styles.login__input} />
                    <Input 
                        placeholder="password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)} 
                        containerStyle={styles.login__input} />
                     {
                        !loading ? (
                            <TouchableOpacity style={styles.login__button}>
                                <Text style={{color: "white", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>LOGIN</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity disabled style={styles.login__button}>
                                <ActivityIndicator size="small" color="#fff" />
                            </TouchableOpacity> 
                        )
                    }
                    <TouchableOpacity onPress={() => history.push('/register')}>
                        <Text style={{color: "#5B61B9", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    login:{
        paddingTop: 30,
        backgroundColor: '#F3F4F6'
    },
    login__container:{
        height: '100%',
        backgroundColor: '#F3F4F6'
    },
    login__top:{
        height: "35%",
        alignItems: 'center',
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
        paddingVertical: '10%',
    },
    login__heading:{
        fontSize: 40,
        marginBottom: 15,
        color:'#374151'
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
