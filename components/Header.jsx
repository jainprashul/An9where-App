import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, View , Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Search from './Search'

const Header = ({title}) => {
    // const [searchIsVisible, setSearchIsVisible] = useState(false)
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {/* <Icon name='menu' style={styles.menu} type='feather' color='#3399FF' /> */}
            <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.headerRight}>
                <Icon name='search' iconStyle={styles.search} size={30} onPress={()=> navigation.navigate('Search')} type='feather' color='#3399FF' />
                <Icon name='favorite' size={30} color='#3399FF' onPress={() => navigation.navigate('Favorites')} />
            </View>
        </View>
    )
}    

const styles = StyleSheet.create({ 
    header: {
        flex: 1,
        width : '100%',
        height: '100%',
        flexDirection: 'row',
        marginRight: 25
        // backgroundColor: '#3399FF',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    headerLogo: {  
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3399FF',
        letterSpacing: 1,
    },
    menu: {
        fontSize: 30,
        // marginLeft: 10,
        marginRight: 15,
    },
    headerRight : {
        // flex: 1,
        // backgroundColor: '#3399FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerLeft : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    search: {
        marginRight: 10,
    }
})

export default Header
