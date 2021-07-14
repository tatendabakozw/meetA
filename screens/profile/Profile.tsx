import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Platform } from 'react-native'
import { auth, db, storage } from '../../firebase'
import ExploreLayout from '../../layouts/ExploreLayout'
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useStateValue } from '../../StateContext/StateProvider';

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
    const [profile_progress, setProfileProgress] = useState<any>()
    const [edit_profile, setEditProfile] = useState(false)

    //bio pictures
    const [bio_picture_preview, setBioPicturePreview] = useState<any>()
    const [bio_picture_loading, setBioPictureLoading] = useState(false)
    const [new_bio_picture, setNewBioPicture] = useState<any>(null)
    const [bio_picture_progress, setBioPictureProgress] = useState<any>()
    const [edit_bio_picture, setEditBioPictures] = useState<any>(false)
    const [all_bio_pictures, setAllBioPictures] = useState<any>()

    const [{current_user, user_bio}] = useStateValue()

    useEffect(() => {
        db.collection('bio_images').onSnapshot(snapshot => {
            setAllBioPictures(snapshot.docs.map(doc => ({
                id: doc.id,
                bio_pic: doc.data()
            })))
        })
    }, [])

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

    //pick profile picture image
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
            setNewBioPicture(blob)
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

    const pickBioPictures = async () =>{
        setEditBioPictures(true)
        let result : any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.7,
          });
      
          // console.log(result);
      
          if (!result.cancelled) {
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
                  setBioPicturePreview(base64data)
              }
          }
    }

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

    //create a random text 
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
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

    //changing the profile picture
    const changeProfilePicture = async () =>{
        setPictureLoading(true)
        const uploadTask = storage.ref(`/images/propics/${current_user.uid}`).put(new_bio_picture)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProfileProgress(progress);
        }, (error) => {
            console.log(error);
            alert(error.message)
        },
            () => {
                storage.ref('images/propics').child(current_user.uid).getDownloadURL().then(url => {
                    user.updateProfile({
                        photoURL: url
                    })
                })
                setPictureLoading(false)
                setEditProfile(false)
            }
        )
    }

    const uploadBioPicture = async () =>{
        setBioPictureLoading(true)
        const uploadTask = storage.ref(`/images/biopics/${current_user?.uid}`).put(new_profile_picture)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setBioPictureProgress(progress);
        }, (error) => {
            console.log(error);
            alert(error.message)
        },
            () => {
                storage.ref('images/biopics').child(current_user?.uid).getDownloadURL().then(url => {
                    db.collection('bio_images').doc(current_user?.uid + '-' + Date.now()).set({
                        bio_image: url
                    }, {merge: true})
                })
                setBioPictureLoading(false)
                setEditBioPictures(false)
            }
        )

        // const uploadTask = storage.ref(`/images/service/${picture.name}`).put(picture)
        // uploadTask.on("state_changed", (snapshot) => {
        //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //     setBioPictureProgress(progress);
        // }, (error) => {
        //     console.log(error);
        //     alert(error.message)
        // },
        //     () => {
        //         storage.ref('images/service').child(picture.name).getDownloadURL().then(url => {
        //             db.collection('homepage').add({
        //                 home_title: home_title,
        //                 home_picture: url
        //             })
        //         })
        //     }
        // )
    }

    //logout function
    const logout = () =>{
        AsyncStorage.removeItem('@current_user')
        AsyncStorage.removeItem('@user_bio')
        auth.signOut()
        navigation.replace('login')
    }

    return (
        <ExploreLayout header_title="Account" header__back__activity={()=> navigation.goBack()}>
            {/* <Text>{user.uid}</Text> */}
            <Text>{JSON.stringify(current_user)}</Text>
            <View style={styles.account__container}>
                        {edit_profile && <View style={styles.preview__imageContainer}>
                        <Image source={{ uri: profile__preview }} style={styles.preview__image} />
                        {
                            picture_loading ? 
                                (<TouchableOpacity disabled style={{backgroundColor:'#5B61B9', borderRadius: 50, padding: 10, width: '100%', marginVertical: 10}}>
                                    <ActivityIndicator size="small" color="#fff" />
                                    {/* <Text style={{color: 'white', textAlign: 'center'}} >{profile_progress}%</Text> */}
                                </TouchableOpacity>):
                                (<View style={{flexDirection: 'column', width: '100%'}}>
                                    <TouchableOpacity onPress={changeProfilePicture} activeOpacity={0.8} style={styles.purple__button}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>Save Picture</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>setEditProfile(false)} activeOpacity={0.8} style={styles.red__button}>
                                            <Text style={{color: '#333', textAlign: 'center'}}>Cancel Profile Change</Text>
                                    </TouchableOpacity>
                                </View>)
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
                    <View style={{flexDirection: 'column', width: '100%', flex:1}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex:1}}>
                                <Text style={styles.account__name}>{info_loading ? 'Username' : current_user?.displayName}</Text>
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
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', flex:1, justifyContent:'space-between'}}>
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
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between'}}>
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

                {edit_bio_picture && <View style={styles.preview__imageContainer}>
                    <Image source={{ uri: bio_picture_preview }} style={styles.preview__image} />
                    {
                        bio_picture_loading ? (
                            <TouchableOpacity activeOpacity={0.7} disabled style={styles.purple__button}>
                                <ActivityIndicator size="small" color="#fff" />
                                {/* <Text style={{color: 'white', textAlign: 'center'}} >10%</Text> */}
                            </TouchableOpacity>
                        ) :(<View style={{flexDirection: 'column', width: '100%'}}>
                                <TouchableOpacity onPress={uploadBioPicture} activeOpacity={0.8} style={styles.purple__button}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Upload Picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>setEditBioPictures(false)} activeOpacity={0.8} style={styles.red__button}>
                                        <Text style={{color: '#333', textAlign: 'center'}}>Cancel Upload</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View> }

                <View style={{flexDirection: 'column', width: '100%', marginVertical: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{color: '#374151', fontSize: 25, fontWeight: 'bold', marginRight: 10}}>Pictures</Text>
                        <TouchableOpacity onPress={pickBioPictures} activeOpacity={0.8}>
                            <MaterialIcons name="add-a-photo" size={24} color="#60A5FA" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal>
                        {
                            all_bio_pictures?.map((pic:any)=>(
                                <>
                                    {pic.id.split('-')[0] === user.uid ? (
                                        <TouchableOpacity activeOpacity={0.7} style={{height: 120, width: 120, overflow: 'hidden', borderRadius: 15, marginVertical: 20, marginRight: 20}}>
                                            <Image source={{uri: pic.bio_pic.bio_image}} resizeMode="cover" style={{height: 120, width: 120}} />
                                        </TouchableOpacity>
                                    ):null}
                                </>
                            ))
                        }
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
        marginBottom: 5,
        flex:1,
        width: '100%'
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
    },
    preview__imageContainer:{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    preview__image:{
        width: 200, 
        height: 200, 
        marginVertical: 10,
        borderRadius: 15
    },
    purple__button:{
        backgroundColor:'#5B61B9', 
        borderRadius: 50, 
        padding: 10, 
        width: '100%', 
        marginVertical: 10
    },
    red__button:{
        backgroundColor:'#FECACA', 
        borderRadius: 50, 
        padding: 10, 
        width: '100%', 
        marginVertical: 10, 
        borderWidth:1, 
        borderColor:'#DC2626'
    }
})
