import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native'
import { useHistory } from 'react-router-native'
import { auth, db } from '../../firebase'
import ExploreLayout from '../../layouts/ExploreLayout'
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

    //gender
    const [edit_gender, setEditGender] = useState(false)
    const [new_gender, setNewGender] = useState('')
    const [gender_loading, setGenderLoading] = useState(false)

    //username
    const [new_username, setNewUsername] = useState<any>()
    const [edit_username, setEditUsername] = useState(false)
    const [username_loading, setUsernameLoading] = useState(false)

    //bio
    const [new_bio, setNewBio] = useState<any>('')
    const [bio_loading, setBioLoading] = useState(false)
    const [edit_bio, setEditBio] = useState(false)

    //user info
    const [user, setUser] = useState<any>()
    const [info_loading, setInfoLoading] = useState(false)
    const [user_doc, setUserDoc] = useState<any>()


    const getData = async () => {
        setInfoLoading(true)
        const unsubscribe = auth.onAuthStateChanged(auth_user=>{
            if(auth_user){
                setUser(auth_user)
                setInfoLoading(false)
            }
        })
    
        return unsubscribe;
    }

    const createBio = () =>{
        setBioLoading(true)
        db.collection('meetA').doc(user.uid).set({'bio' : new_bio}, {merge: true}).then(res=>{
            setBioLoading(false)
            setEditBio(false)
        })
    }
    const createGender = () =>{
        setGenderLoading(true)
        db.collection('meetA').doc(user.uid).set({'gender' : new_gender}, {merge: true}).then(res=>{
            setGenderLoading(false)
            setEditGender(false)
        })
    }
    const createUsername = () =>{
        setUsernameLoading(true)
        user.updateProfile({
            displayName: new_username
        }).then((res: any)=>{
            console.log(res)
            setEditUsername(false)
            setUsernameLoading(false)
        }).catch((e: any)=>{
            console.log(e)
        })
    }

    const getUserDoc = async () =>{
        const cityRef = db.collection('meetA').doc(user.uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            // console.log('Document data:', doc.data());
            setUserDoc(doc.data())
        }
    }

    useEffect(()=>{
        getUserDoc()
    },[bio_loading, gender_loading, user])

    useEffect(()=>{
        getData()
    },[user])

    const history = useHistory()
    const logout = () =>{
        AsyncStorage.removeItem('@current_user')
        auth.signOut()
        history.push('/')
    }

    const toggleEditBio = () =>{
        setEditBio(!edit_bio ? true : false)
    }
    const toggleEditUsername = () =>{
        setEditUsername(!edit_username ? true : false)
    }
    const toggleEditGender = () =>{
        setEditGender(!edit_gender ? true : false)
    }

    return (
        <ExploreLayout header_title="Account" header__back__activity={()=> history.goBack()}>
            {/* <Text>{user?.uid}</Text> */}
            <View style={styles.account__container}>
                <View style={{flexDirection: 'row',alignItems: 'center', width: '100%'}}>
                    <View style={styles.account__image}>
                        <Image source={{uri: user?.photoURL}} resizeMode="cover" style={{height: 100, width:100}} />
                       
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.account__name}>{info_loading ? 'Username' : user?.displayName}</Text>
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
                                    onChangeText={text => setNewUsername(text)}
                                />
                                {
                                    username_loading ? (
                                        <TouchableOpacity disabled style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                            <ActivityIndicator size="small" color="#fff" />
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity 
                                            onPress={createUsername} 
                                            style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                            <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>) : null
                        }
                        </View>
                        <View style={{marginVertical: 10, flexDirection: 'column', width: '100%'}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                <Text style={{color: '#9CA3AF', fontSize: 20, marginBottom: 5}}>
                                    {
                                        user_doc?.gender ? (`${user_doc?.gender}`) : (`Gender`)
                                    }
                                </Text>
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
                                        onChangeText={text => setNewGender(text)}
                                    />
                                    {
                                        gender_loading ? (
                                            <TouchableOpacity disabled style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                                <ActivityIndicator size="small" color="#fff" />
                                            </TouchableOpacity>
                                        ):(
                                            <TouchableOpacity 
                                                onPress={createGender} 
                                                style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                                <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                            </TouchableOpacity>
                                        )
                                    }
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
                                    onChangeText={text => setNewBio(text)}
                                />
                            {
                                bio_loading ? (
                                    <TouchableOpacity disabled style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                        <ActivityIndicator size="small" color="#fff" />
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity 
                                        onPress={createBio} 
                                        style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </>) : (
                            <>
                                {
                                    info_loading ? (<Text style={{color: '#9CA3AF', fontSize: 15, lineHeight: 25}}>Your Biography</Text>) : (
                                        <Text style={{color: '#9CA3AF', fontSize: 15, lineHeight: 25}}>{user_doc?.bio}</Text>
                                    )
                                }
                            </>
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
