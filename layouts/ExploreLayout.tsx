import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'
import ExploreHeader from '../components/ExploreHeader/ExploreHeader'

interface Props {
    children?: ReactNode,
    header_title?: string,
    header__back__activity?: () => void
}

const ExploreLayout = ({ children, header_title, header__back__activity }: Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ExploreHeader heading__title={header_title} header__back__activity={header__back__activity} />
            </View>
            <ScrollView style={tw`bg-gray-50 px-2 flex-1 w-full`}>{children}</ScrollView>
        </SafeAreaView>
    )
}

export default ExploreLayout

const styles = StyleSheet.create({})
