import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator, ScrollView } from 'react-native'
import Register_Pic from '../../assets/icons/Register_Pic'
import {Input} from 'react-native-elements'
// import { useHistory } from 'react-router-native'
import { auth } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
    navigation: any
}

const Register = ({navigation}: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
   
    // const history = useHistory()

    const registerWithCredentials = () =>{
        setLoading(true)
        auth.createUserWithEmailAndPassword(email.trim(), password).then(auth_user=>{
            auth_user.user?.updateProfile({
                displayName: username,
                photoURL: gender.toLowerCase().trim() === 'Male' ? 'https://i.ibb.co/qCjtzY7/man.png' : 'https://i.ibb.co/zQGktfn/woman.png'
            })
        }).finally(()=>{
            setLoading(false)
            navigation.navigate('login')
        }).catch(err=>{
            setLoading(false)
            alert(err.message)
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <StatusBar style="auto" />
            <ScrollView style={styles.register__container}>
                <View style={styles.register__top}>
                    <Register_Pic height={250} width={250}/>
                </View>
                <View style={styles.register__bottom}>
                    <Text style={styles.register__heading}>
                        Register
                    </Text>
                    <Input 
                        placeholder="Email"
                        value={email} 
                        onChangeText={text => setEmail(text)}
                        containerStyle={{marginTop: 5}} />
                
                    <Input 
                        placeholder="Password" 
                        secureTextEntry
                        value={password} 
                        onChangeText={text => setPassword(text)}
                        containerStyle={styles.register__input} />
                    <Input 
                        placeholder="Username" 
                        value={username} 
                        onChangeText={text => setUsername(text)}
                        containerStyle={styles.register__input} />
                    <Input 
                        placeholder="Gender" 
                        value={gender} 
                        onChangeText={text => setGender(text)}
                        containerStyle={styles.register__input} />
                    
                    {
                        !loading ? (
                            <TouchableOpacity onPress={registerWithCredentials} style={styles.register__button}>
                                <Text style={{color: "white", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>SIGN UP</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity disabled style={styles.register__button}>
                                <ActivityIndicator size="small" color="#fff" />
                            </TouchableOpacity> 
                        )
                    }
                    <TouchableOpacity onPress={()=> navigation.navigate('login')} >
                        <Text style={{color: "#5B61B9", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    register__container:{
        backgroundColor: '#F3F4F6',
        height: '100%',
    },
    register__top:{
        height: "35%",
        alignItems: 'center'
    },
    register__bottom:{
        backgroundColor: "#fff",
        height: "65%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 30,
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        paddingVertical: '2%',
    },
    register__heading:{
        fontSize: 40,
        marginBottom: 15,
        color: '#374151'
    },
    register__input:{
        marginBottom: 2,
        backgroundColor: '#fff'
    },
    register__button:{
        backgroundColor: "#5B61B9",
        width: '100%',
        padding: 15,
        borderRadius: 50,
        marginBottom: 10
    },
    registerSign__button:{}
})
