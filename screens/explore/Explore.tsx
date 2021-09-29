import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import ExploreItem from '../../components/ExploreItem/ExploreItem'
import CustomLoading from '../../components/Loading/CustomLoading'
import { getData } from '../../helpers/async-storage'
import ExploreLayout from '../../layouts/ExploreLayout'
import {  get_explore_users_Action } from '../../redux/actions/userActions'

const Explore = () => {
    const [user_info, setUserInfo] = useState()
    // @ts-ignore
    const _explore = useSelector(state => state.explore_users)
    const { explore_loading, explore_users } = _explore
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        getData().then(res => {
            dispatch(get_explore_users_Action(res.token))
            setUserInfo(res)
            setLoading(false)
        }).catch(err => {
            // console.log(err)
            setLoading(false)
        })
    }, [dispatch])

    if (loading) {
        return (
            <ExploreLayout header_title={'Profile'}>
                <CustomLoading />
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title="Explore">
            <View style={styles.explore}>
                <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }]}>
                    <View style={styles.buttons}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Shuffle</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
                    </View>
                </View>
                <View style={styles.explore__itemsContainer}>
                    {
                        explore_loading ? (
                            <>
                                <ExploreItem loading={explore_loading} />
                                <ExploreItem loading={explore_loading} />
                                <ExploreItem loading={explore_loading} />
                                <ExploreItem loading={explore_loading} />
                                <ExploreItem loading={explore_loading} />
                                <ExploreItem loading={explore_loading} />
                            </>
                        ) : (
                            <>
                                {explore_users?.length < 1 ? (<View style={tw`flex flex-col items-center w-full`}>
                                    <Text style={tw`text-gray-700 text-lg  my-8`}>You do not have any matches at the moment</Text>
                                </View>) : (
                                    <>
                                        {

                                            explore_users?.map((user: any, index: any) => (
                                                <ExploreItem key={index} user={user} />
                                            ))
                                        }
                                    </>
                                )}
                            </>
                        )
                    }
                </View>
            </View>
        </ExploreLayout>
    )
}

export default Explore

const styles = StyleSheet.create({
    explore: {
        flex: 1
    },
    buttons: {
        backgroundColor: '#1E3A8A',
        paddingVertical: 10,
        borderRadius: 50,
        paddingHorizontal: 20,
        width: '45%'
    },
    explore__itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'scroll',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})
