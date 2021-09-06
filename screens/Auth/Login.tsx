import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames';
import CustomButton from '../../components/CustomButtons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { login_user_Action } from '../../redux/actions/authActions';
import Error from '../../components/Alerts/Error';
import SucCess from '../../components/Alerts/Success';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    // @ts-ignore
    let { loading, error, message } = useSelector(state => state.userSignIn)
    const dispatch = useDispatch()

    const login = () => {
        dispatch(login_user_Action(email.trim(), password))
    }

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={tw`flex flex-row items-center min-h-full px-4`}>
                <View style={tw`flex flex-col items-center mx-auto w-full`}>
                    <Image source={require('../../assets/imgs/logo.png')} style={{ width: 120, height: 120, marginBottom: 10 }} resizeMode="contain" />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={tw`py-2 px-4 border border-gray-300 rounded-full w-full my-4`}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        style={tw`py-2 px-4 border border-gray-300 rounded-full w-full my-4`}
                    />
                    {error ? <Error error={error} /> : null}
                    {message ? <SucCess message={message} /> : null}

                    <CustomButton
                        button_text="Login"
                        loading={loading}
                        button_action={login}
                    />
                    <CustomButton
                        button_text="Register"
                        outline
                        button_action={() => navigation.navigate('register')}
                    />

                    <Text style={tw`text-gray-400 text-sm`}>By continuing you agree to our <Text style={tw`text-blue-900 font-bold`}>terms and conditions</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login