import React from 'react'

import { StyleSheet, View, Text, Button, Image  } from 'react-native'

const Favorites = ({route}) => {
    // const { button , description , image , title} = route.params
    
    return (
    <View style={styles.container}>
        <Text>Favorites</Text>
        {/* <Text >{title}</Text>
        <Text>{description}</Text>
        <Image source={{uri: image}} style={styles.image} /> */}
        <Button style={styles.button} title='Btn' onPress={() => {    
            console.log('button pressed')
        }}/>
    </View>
    )
} 

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
    button: {
        marginVertical : 10,
        padding : 10,
        backgroundColor : '#00AFF0',
    },
})

export default Favorites

