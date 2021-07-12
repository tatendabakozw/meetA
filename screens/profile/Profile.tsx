import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useHistory } from 'react-router-native'
import { auth } from '../../firebase'
import ExploreLayout from '../../layouts/ExploreLayout'
import { EvilIcons } from '@expo/vector-icons';

const Profile = () => {
    const [edit_bio, setEditBio] = useState(false)
    const [edit_username, setEditUsername] = useState(false)
    const [edit_gender, setEditGender] = useState(false)
    const [new_bio, setNewBio] = useState('')

    const history = useHistory()
    const logout = () =>{
        auth.signOut()
        history.push('/')
    }

    const toggleEditBio = () =>{
        setEditBio(edit_bio === false ? true : false)
    }
    const toggleEditUsername = () =>{
        setEditUsername(edit_username === false ? true : false)
    }
    const toggleEditGender = () =>{
        setEditGender(edit_gender === false ? true : false)
    }

    return (
        <ExploreLayout header_title="Account" header__back__activity={()=> history.goBack()}>
            <View style={styles.account__container}>
                <View style={{flexDirection: 'row',alignItems: 'center', width: '100%'}}>
                    <View style={styles.account__image}>
                        <Image source={require('../../assets/imgs/bako.jpg')} resizeMode="cover" style={{height: 100, width:100}} />
                        {/* <View style={styles.cameraicon}>
                            <SimpleLineIcons name="camera" size={28} color="black" />
                        </View> */}
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.account__name}>Tatenda Bako</Text>
                                <TouchableOpacity onPress={toggleEditUsername} activeOpacity={0.7} style={{marginBottom: 10, marginLeft: 10}}>
                                    <EvilIcons name="pencil" size={24} color="#60A5FA" />
                                </TouchableOpacity>
                            </View>
                        {
                            edit_username ? (<View style={{width: '100%', marginBottom: 20}}>
                                <TextInput 
                                    placeholder="New username" 
                                    style={{width: '100%', borderColor:'#D1D5DB', borderWidth: 1, borderRadius:50, paddingHorizontal: 10, paddingVertical:5}} 
                                    numberOfLines={1} 
                                />
                                <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                </TouchableOpacity>
                            </View>) : null
                        }
                        </View>
                        <View style={{marginVertical: 10, flexDirection: 'column', width: '100%'}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                <Text style={{color: '#9CA3AF', fontSize: 20, marginBottom: 5}}>Male</Text>
                                <TouchableOpacity onPress={toggleEditGender} activeOpacity={0.7} style={{marginBottom: 10, marginLeft: 10}}>
                                    <EvilIcons name="pencil" size={24} color="#60A5FA" />
                                </TouchableOpacity>
                            </View>
                            {
                                edit_gender ? (<>
                                    <TextInput 
                                        placeholder="New gender" 
                                        style={{width: '100%', borderColor:'#D1D5DB', borderWidth: 1, borderRadius:50, paddingHorizontal: 10, paddingVertical: 5}} 
                                        numberOfLines={1} 
                                    />
                                    <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                    </TouchableOpacity>
                                </>) : null
                            }
                        </View>
                    </View>
                   
                </View>
                
                <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}} onPress={logout}>
                    <Text style={{color: 'white', textAlign: 'center'}}>logout</Text>
                </TouchableOpacity>
                <View style={{marginVertical: 10, flexDirection: 'column', width: '100%'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                        <Text style={{color: '#374151', fontSize: 25, marginBottom: 10, fontWeight: 'bold'}}>Bio</Text>
                        <TouchableOpacity onPress={toggleEditBio} activeOpacity={0.7} style={{marginBottom: 10, marginLeft: 10}}>
                            <EvilIcons name="pencil" size={24} color="#60A5FA" />
                        </TouchableOpacity>
                    </View>
                    {
                        edit_bio ? (<>
                            <TextInput 
                                    placeholder="Write new bio here" 
                                    style={{width: '100%', borderColor:'#D1D5DB', borderWidth: 1, borderRadius:15, padding: 10}} 
                                    numberOfLines={5} 
                                />
                            <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                            </TouchableOpacity>
                        </>) : (
                            <Text style={{color: '#9CA3AF', fontSize: 15, lineHeight: 25}}>In publishing and graphic design, 
                                Lorem ipsum is a placeholder text commonly 
                                used to demonstrate the visual form of a document 
                                or a typeface without relying on meaningful content. 
                                Lorem ipsum may be used as 
                                a placeholder before final copy is available
                            </Text>
                        )
                    }
                </View>
               
                <TouchableOpacity style={{backgroundColor:'#FECACA', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10, borderWidth:1, borderColor:'#DC2626'}} onPress={logout}>
                    <Text style={{color: '#B91C1C', textAlign: 'center', fontWeight:'bold'}}>Delete Account</Text>
                </TouchableOpacity>
                
            </View>
        </ExploreLayout>
    )
}

export default Profile

const styles = StyleSheet.create({
    account__container:{
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex:1
    },
    account__image:{
        height: 100,
        width: 100,
        borderRadius: 150,
        overflow: 'hidden',
        margin: 10,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        position: 'relative',
        display: 'flex',
        zIndex: 10
    },
    account__name:{
        color: '#374151',
        fontSize: 25,
        marginBottom: 5
    },
    cameraicon:{
        position: 'absolute',
        zIndex: 100,
        height: 35,
        width: 35,
        backgroundColor: '#fff',
        bottom: 0,
        left: 50,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 5
    }
})
