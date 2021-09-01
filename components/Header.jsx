import React from 'react'
import { StyleSheet, View , Text } from 'react-native'
import { Icon } from 'react-native-elements'

const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Icon name='menu' style={styles.menu} type='feather' color='#3399FF' />
            <Text style={styles.headerTitle}>{title}</Text>
            
        </View>
    )
}    

const styles = StyleSheet.create({ 
    header: {
        flex: 1,
        width : '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
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
        
    }
})

export default Header
