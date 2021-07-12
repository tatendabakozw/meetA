import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator, ScrollView } from 'react-native'
import Register_Pic from '../../assets/icons/Register_Pic'
import {Input} from 'react-native-elements'
import { useHistory } from 'react-router-native'
import { auth } from '../../firebase'
import DropDownPicker from 'react-native-dropdown-picker'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Rather not say', value: 'other'}
    ]);
    const [open, setOpen] = useState(false)

    const history = useHistory()

    const registerWithCredentials = () =>{
        setLoading(true)
        auth.createUserWithEmailAndPassword(email.trim(), password).then(auth_user=>{
            auth_user.user?.updateProfile({
                displayName: username,
                photoURL: gender === 'Male' ? 'https://i.ibb.co/qCjtzY7/man.png' : 'https://i.ibb.co/zQGktfn/woman.png'
            })
        }).finally(()=>{
            setLoading(false)
            history.push('/')
        }).catch(err=>{
            alert(err.message)
        })
    }

    return (
        <ScrollView style={styles.register}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'padding'} style={styles.register__container}>
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
                        {/* <View style={{backgroundColor: '#fff', marginBottom: 20}}>
                        <DropDownPicker
                            open={open}
                            value={gender}
                            items={items}
                            setOpen={setOpen}
                            setValue={setGender}
                            setItems={setItems}
                            placeholder="Select Gender"
                            containerStyle={{backgroundColor: 'white', borderRadius: 50}}
                            theme="LIGHT"
                            mode="SIMPLE"
                            
                        />
                    </View> */}
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
                    <TouchableOpacity onPress={() => history.push('/')}>
                        <Text style={{color: "#5B61B9", fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    register:{
        paddingTop: 30,
        backgroundColor: '#F3F4F6',
    },
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
