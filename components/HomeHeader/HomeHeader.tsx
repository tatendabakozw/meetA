import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

interface Props{
    heading__title ?: string
}

const HomeHeader = ({heading__title}:Props) => {

    const [search_on, setSearchOn] = useState('off')

    const toggleSearch = () =>{
        setSearchOn(search_on === 'off' ? 'on' : 'off' )
    }

    return (
        <View style={styles.header}>
            <StatusBar style="auto" />
            <View style={styles.header__top}>
                <View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#333'}}>{heading__title}</Text>
                </View>
                <TouchableOpacity onPress={toggleSearch} style={{borderRadius: 50, padding: 5}}>
                    <AntDesign name="search1" size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>
            <View style={styles.header__bottom}>
                {
                    search_on === 'on' ? (
                        <View style={styles.header__search}>
                            <TextInput placeholder="Search" style={styles.header__searchInput} />
                        </View>
                    ):(
                        <>
                            <TouchableOpacity activeOpacity={0.7} style={styles.header__colorItem}>
                                <Text style={{color: '#fff', fontSize: 12}}>My Chats</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={styles.header__nonecolrItem}>
                                <Text style={{color: '#374151', fontSize: 12}}>Friends</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
              
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    header:{
        height: 130,
        padding: 20,
        backgroundColor: "#fff",
        borderBottomColor:'#F3F4F6', // if you need 
        borderBottomWidth:1,
        overflow: 'hidden',
        shadowColor: '#F3F4F6',
        shadowRadius: 10,
        shadowOpacity: 1,
        
    },
    header__top:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    header__bottom:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    header__colorItem:{
        backgroundColor: '#5B61B9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginRight: 10
    },
    header__nonecolrItem:{
        backgroundColor: '#f3f3f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginRight: 10
    },
    header__search:{
        backgroundColor: '#F9FAFB',
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 50,
        marginRight: 10,
        width: '100%'
    },
    header__searchInput:{

    }
})
