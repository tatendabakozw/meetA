import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

const HomeHeader = () => {

    const [search_on, setSearchOn] = useState('off')

    const toggleSearch = () =>{
        setSearchOn(search_on === 'off' ? 'on' : 'off' )
    }

    return (
        <View style={styles.header}>
            <StatusBar style="auto" />
            <View style={styles.header__top}>
                <View>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#333'}}>Chats</Text>
                </View>
                <TouchableOpacity onPress={toggleSearch} style={{borderRadius: 50, padding: 5}}>
                    <AntDesign name="search1" size={22} color="#6B7280" />
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
                            <View style={styles.header__colorItem}>
                                <Text style={{color: '#fff', fontSize: 16}}>Other Stuff</Text>
                            </View>
                            <View style={styles.header__nonecolrItem}>
                                <Text style={{color: '#333'}}>Stuff</Text>
                            </View>
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
        paddingVertical: 8,
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
        backgroundColor: '#f3f3f3',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginRight: 10,
        width: '100%'
    },
    header__searchInput:{

    }
})
