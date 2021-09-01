import React from 'react'

import { StyleSheet, View, Text, Button, Image  } from 'react-native'

const Favorites = ({route}) => {
    // const { button , description , image , title} = route.params
    
    return (
    <View style={styles.container}>
        <Text>You don't have any favorites yet</Text>
        {/* <Text >{title}</Text>
        <Text>{description}</Text>
        <Image source={{uri: image}} style={styles.image} /> */}

    </View>
    )
} 

const styles = StyleSheet.create({ 
    container: {
        marginTop: 50,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
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

