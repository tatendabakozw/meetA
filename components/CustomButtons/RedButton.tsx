import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface Props {
    button_text: string,
    outline?: boolean,
    button_action?: () => void,
    loading?: boolean
}

export default function RedButton({ button_text, outline, button_action, loading }: Props) {
    return (
        <TouchableOpacity
            disabled={loading}
            activeOpacity={0.8}
            onPress={button_action}
            style={[tw`${outline ? `border border-red-500` : `bg-red-500`} p-4 w-full my-2`, styles.button]}
        >
            <Text style={[tw`${outline ? `text-red-500` : `text-white`} text-center font-semibold uppercase font-bold`, styles.text]}>
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
