import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'

const AuthNavigation = createStackNavigator(
    {
        login: { screen: Login },
        register: { screen: Register }
    },
    {
        initialRouteName: 'Login'
    }
)

export default AuthNavigation