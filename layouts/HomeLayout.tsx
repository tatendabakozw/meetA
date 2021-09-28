import React, { useState, useEffect } from 'react'
import { ReactNode } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import { getData } from '../helpers/async-storage';

interface Props {
    children?: ReactNode,
}

const HomeLayout = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<null>()

    console.log(loading)

    useEffect(() => {
        setLoading(true)
        getData().then(res => {
            setLoading(false)
            setUser(res)
        }).catch(error => {
            console.log(error)
            setLoading(false)
            setUser(null)
        })
    }, [])

    return (
        <SafeAreaView style={tw`pb-32 flex-1`}>
            <View>
                <HomeHeader user={user} />
            </View>
            <ScrollView style={[tw`min-h-full flex-1`, { paddingHorizontal: 10, backgroundColor: '#F9FAFB' }]}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeLayout

