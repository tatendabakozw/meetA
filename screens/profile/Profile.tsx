import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Platform } from 'react-native'
import { auth, db, storage } from '../../firebase'
import ExploreLayout from '../../layouts/ExploreLayout'
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface Props{
    navigation : any
}

const Profile = ({navigation}:Props) => {

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

    //user profile picture
    const [profile__preview, setProfilePreview] = useState<any>()
    const [picture_loading, setPictureLoading] = useState(false)
    const [new_profile_picture, setNewProfilePicture] = useState<any>(null);
    const [profile_progress, setProfileProgress] = useState(0)
    const [edit_profile, setEditProfile] = useState(false)

    //checking image permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
    }, []);

    const pickImage = async () => {
        setEditProfile(true)
        let result : any = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 0.7,
        });
    
        // console.log(result);
    
        if (!result.cancelled) {
            // setNewProfilePicture(result.uri);
            // const file = await FileSystem.readAsStringAsync(result.uri, {
            //     encoding: FileSystem.EncodingType.Base64,
            // });
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                resolve(xhr.response);
                };
                xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", result.uri, true);
                xhr.send(null);
            });
            setNewProfilePicture(blob)
            // Implement a new Blob promise with XMLHTTPRequest
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(blob)
            fileReaderInstance.onload = () => {
                const base64data = fileReaderInstance.result;                
                console.log(base64data);
                setProfilePreview(base64data)
            }
        }

        
        
        
    };

    const createBio = () =>{
        setBioLoading(true)
        db.collection('meetA').doc(user.uid).set({'bio' : new_bio}, {merge: true}).then(res=>{
            AsyncStorage.setItem('@user_bio', new_bio)
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

    //get current user from from firestore
    useEffect(()=>{
        db.collection('meetA').doc(user?.uid).onSnapshot(doc=>{
            setUserDoc(doc.data())
        })
    },[])

    //check if user is logged in
    useEffect(()=>{
        setInfoLoading(true)
        const unsubscribe = auth.onAuthStateChanged(auth_user=>{
            if(auth_user){
                setUser(auth_user)
                setInfoLoading(false)
            }
        })
    
        return unsubscribe;
    },[])

    //lgout function
    const logout = () =>{
        AsyncStorage.removeItem('@current_user')
        AsyncStorage.removeItem('@user_bio')
        auth.signOut()
        navigation.replace('login')
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

    const changeProfilePicture = async () =>{
        setPictureLoading(true)
        const uploadTask = storage.ref(`/images/propics/${user.uid}`).put(new_profile_picture)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProfileProgress(progress);
        }, (error) => {
            console.log(error);
            alert(error.message)
        },
            () => {
                storage.ref('images/propics').child(user.uid).getDownloadURL().then(url => {
                    user.updateProfile({
                        photoURL: url
                    })
                })
                setPictureLoading(false)
                setEditProfile(false)
            }
        )


        // const ref = storage.ref().child(`images/propics/${user.uid+"-"+ Date.now()}`);
        // // Upload Base64 image to Firebase
        // const snapshot = await ref.put(new_profile_picture);
        // // Create a download URL
        // const remoteURL = await snapshot.ref.getDownloadURL();
        
        // if(remoteURL){
        //     user.updateProfile({
        //         photoURL: remoteURL
        //     })
        //     setPictureLoading(false)
        //     console.log(remoteURL)
        // }else{
        //     alert('no piii')
        // }
    }

    return (
        <ExploreLayout header_title="Account" header__back__activity={()=> navigation.goBack()}>
            {/* <Text>{user.uid}</Text> */}
            
            <View style={styles.account__container}>
                        {edit_profile && <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={{ uri: profile__preview }} style={{ width: 200, height: 200,  marginVertical: 10 }} />
                        {
                            picture_loading ? (<TouchableOpacity disabled style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                {/* <ActivityIndicator size="small" color="#fff" /> */}
                                <Text style={{color: 'white', textAlign: 'center'}} >{profile_progress}%</Text>
                                </TouchableOpacity>):(<TouchableOpacity onPress={changeProfilePicture} style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>Save Picture</Text>
                                </TouchableOpacity>)
                        }
                    </View>}
                <View style={{flexDirection: 'row',alignItems: 'center', width: '100%'}}>
                    <View style={{flexDirection: 'row', alignItems:'baseline', marginVertical: 10}}>
                        <View style={styles.account__image}>
                            <Image source={{uri: user?.photoURL}} resizeMode="cover" style={{height: 100, width:100}} />
                        </View>
                        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                            <EvilIcons name="camera" size={30} color="#60A5FA" />
                        </TouchableOpacity>
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
                <TouchableOpacity style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 20}} onPress={logout}>
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
                                    !user_doc?.bio ? (<Text style={{color: '#9CA3AF', fontSize: 15, lineHeight: 25}}>Your Bio will appear here. Should not include contact details</Text>) : (
                                        <Text style={{color: '#9CA3AF', fontSize: 15, lineHeight: 25}}>{user_doc?.bio}</Text>
                                    )
                                }
                            </>
                        )
                    }
                </View>

                <View style={{flexDirection: 'column', width: '100%', marginVertical: 20}}>
                    <Text style={{color: '#374151', fontSize: 25, fontWeight: 'bold'}}>Pictures</Text>
                    <ScrollView horizontal>
                        <View style={{height: 100, width: 100, overflow: 'hidden', borderRadius: 15, marginVertical: 20, marginRight: 20}}>
                            <Image source={require('../../assets/imgs/bako.jpg')} resizeMode="cover" style={{height: 100, width: 100}} />
                        </View>
                        <View style={{height: 100, width: 100, overflow: 'hidden', borderRadius: 15, marginVertical: 20, marginRight: 20}}>
                            <Image source={require('../../assets/imgs/bako.jpg')} resizeMode="cover" style={{height: 100, width: 100}} />
                        </View>
                        <View style={{height: 100, width: 100, overflow: 'hidden', borderRadius: 15, marginVertical: 20, marginRight: 20}}>
                            <Image source={require('../../assets/imgs/bako.jpg')} resizeMode="cover" style={{height: 100, width: 100}} />
                        </View>
                        <View style={{height: 100, width: 100, overflow: 'hidden', borderRadius: 15, marginVertical: 20, marginRight: 20}}>
                            <Image source={require('../../assets/imgs/bako.jpg')} resizeMode="cover" style={{height: 100, width: 100}} />
                        </View>
                    </ScrollView>
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
        flex:1,
        paddingVertical: 20
    },
    account__image:{
        height: 100,
        width: 100,
        borderRadius: 150,
        overflow: 'hidden',
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        display: 'flex',
        zIndex: 10,
        flexDirection: 'row',
        marginVertical: 10
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
