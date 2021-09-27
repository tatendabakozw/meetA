// async-storage.js file
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem() {
    const value = await AsyncStorage.getItem('userInfo');
    return value ? JSON.parse(value) : null;
}
export async function setItem(value) {
    return AsyncStorage.setItem('userInfo', JSON.stringify(value));
}
export async function removeItem() {
    return AsyncStorage.removeItem('userInfo');
}

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user_value', jsonValue)
    } catch (e) {
        // saving error
        console.log('error storing data')
    }
}

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_value')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(e)
    }
}

export const removeData = async () => {
    try {
        await AsyncStorage.removeItem('@user_value')
        return null
    } catch (error) {
        console.log(error)
    }
}