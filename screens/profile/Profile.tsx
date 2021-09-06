import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import CustomLoading from '../../components/Loading/CustomLoading'
import { auth } from '../../firebase'
import ExploreLayout from '../../layouts/ExploreLayout'
import { get_current_set_user_Action } from '../../redux/actions/userActions'
import PropicUsername from '../../components/ProfileSections/PropicUsername'
import BioSection from '../../components/ProfileSections/BioSection'
import PicturesSection from '../../components/ProfileSections/PicturesSection'
import RedButton from '../../components/CustomButtons/RedButton'
import GenderSections from '../../components/ProfileSections/GenderSections'

interface Props {
    navigation?: any
}

const Profile = ({ navigation }: Props) => {

    // @ts-ignore
    const user_info = useSelector(state => state.current_user)
    const { loading, user } = user_info

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_current_set_user_Action(auth.currentUser?.uid))
    }, [dispatch])

    if (loading) {
        return (
            <ExploreLayout header_title={'Profile'}>
                <CustomLoading />
            </ExploreLayout>
        )
    }

    return (
        <ExploreLayout header_title={'Profile'} header__back__activity={() => navigation.goBack()}>

            <View style={tw`flex-col w-full items-center pt-4 flex-1 items-center content-center`}>
                {/* // the profile pic and username */}
                <>
                    <PropicUsername user={user} />
                </>

                {/* //to add and edit user bio */}
                <View style={tw`border-b border-gray-300 w-full my-8 w-3/4`} />
                <>
                    <BioSection user={user} />
                </>

                {/* //edit and add pictures to you account */}
                <>
                    <PicturesSection user={user} />
                </>

                {/* //edit and add pictures to you account */}
                <>
                    <GenderSections user={user} />
                </>

                <View style={tw`flex w-full my-8`}>
                    <RedButton button_text={'Delete Account'} />
                </View>
            </View>

        </ExploreLayout>
    )
}

export default Profile
