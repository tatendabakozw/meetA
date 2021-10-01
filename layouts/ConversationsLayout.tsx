import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import ConverHeader from '../components/ConverHeader/ConverHeader'
import ConversatonInput from '../components/ConversationInput/ConversatonInput'

interface Props {
    children?: ReactNode,
    header_title?: string,
    back_location: () => void,
}

const ConversationsLayout = ({ children, back_location }: Props) => {

    return (
        <SafeAreaView style={tw`bg-gray-50 flex-1`}>
            <View>
                <ConverHeader back_location={back_location} />
            </View>
            <View style={tw`flex-1`} />
            <ScrollView style={tw`bg-gray-50 flex-1`}>
                {children}
            </ScrollView>
            <View style={tw`pt-2 bottom-2 w-full fixed`}>
                <ConversatonInput />
            </View>
        </SafeAreaView>
    )
}

export default ConversationsLayout
