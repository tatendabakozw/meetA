import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import ConverHeader from '../components/ConverHeader/ConverHeader'

interface Props {
    children?: ReactNode,
    header_title?: string,
    back_location: () => void,
}

const ConversationsLayout = ({ children, back_location}: Props) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <View>
                <ConverHeader back_location={back_location} />
            </View>
            <ScrollView style={{ backgroundColor: '#F3F4F6', flex: 1 }}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConversationsLayout
