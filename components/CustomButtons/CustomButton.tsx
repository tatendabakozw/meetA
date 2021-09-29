import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface Props {
    button_text: string,
    outline?: boolean,
    button_action?: () => void,
    loading?: boolean
}

export default function CustomButton({ button_text, outline, button_action, loading }: Props) {
    return (
        <TouchableOpacity
            disabled={loading}
            activeOpacity={0.8}
            onPress={button_action}
            style={[tw`${outline ? `border-2 border-blue-900 ` : `bg-blue-900`} p-4 w-full my-2`, styles.button]}
        >
            <Text style={[tw`${outline ? `text-blue-900` : `text-white`} text-center font-semibold uppercase font-bold`, styles.text]}>
                {loading ? (<ActivityIndicator size="small" {...outline ? { color: "#0000ff" } : { color: "#fff" }} />) : button_text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50
    },
    text: {
        fontSize: 12,
    }
})
