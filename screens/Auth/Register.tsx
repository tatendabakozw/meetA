import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames';
import CustomButton from '../../components/CustomButtons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { register_user_Action } from '../../redux/actions/authActions';
import Error from '../../components/Alerts/Error';
import SucCess from '../../components/Alerts/Success';
import { socket } from '../../helpers/socket';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const navigation = useNavigation()
    const [err, setErr] = useState('')

    // @ts-ignore
    const { loading, error, message } = useSelector(state => state.user_register)
    const dispatch = useDispatch()

    const register_user = () => {
        if (!username || !email || !password) {
            setErr('Enter all fields')
            setTimeout(() => {
                setErr('')
            }, 3000);
        } if (password.length < 6) {
            setErr('Password should be greater than 6 characters')
            setTimeout(() => {
                setErr('')
            }, 3000);
        } else {
            dispatch(register_user_Action(email.trim(), password, username))
        }
    }

    useEffect(() => {
        socket.on('register-success', (data) => {
            if (data === 'sucessfully registered') {
                setTimeout(() => {
                    navigation.navigate('login')
                }, 1500);
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={tw`flex flex-row items-center min-h-full px-4`}>
                <View style={tw`flex flex-col items-center mx-auto w-full`}>
                    <Image source={require('../../assets/imgs/logo.png')} style={{ width: 120, height: 120, marginBottom: 10 }} resizeMode="contain" />
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUserName(text)}
                        style={[tw`py-2 px-4 border border-gray-300 w-full my-4`, styles.input]}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={[tw`py-2 px-4 border border-gray-300 w-full my-4`, styles.input]}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        style={[tw`py-2 px-4 border border-gray-300 w-full my-4`, styles.input]}
                    />

                    {err ? <Error error={err} /> : null}
                    {error ? <Error error={error} /> : null}
                    {message ? <SucCess message={message} /> : null}


                    <CustomButton
                        button_text="Register"
                        loading={loading}
                        button_action={register_user}
                    />


                    <CustomButton
                        outline
                        button_text="Login"
                        button_action={() => navigation.navigate('login')}
                    />

                    <Text style={tw`text-gray-400 text-sm`}>By continuing you agree to our <Text style={tw`text-blue-900 font-bold`}>terms and conditions</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    input: {
        borderRadius: 50
    }
})