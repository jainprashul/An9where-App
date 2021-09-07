import React, { useEffect } from 'react'

import { StyleSheet, View, Text, Button, Image } from 'react-native'
import AniGrid from '../components/AniGrid'
import LocalStorage from '../helpers/LocalStorage';

const Favorites = ({ route }) => {
    // const { button , description , image , title} = route.params
    const [favorites, setFavorites] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)


    useEffect(() => {
        LocalStorage.getObject('favorites').then(data => {
            console.log(data)
            let res = data ? [...data] : []
            setFavorites(res)
            setIsLoading(false)
        }
        )
        
    }, [])

    return (
        <View style={styles.container}>
            {favorites.length ? <AniGrid data={favorites} title="Favorites" />
                :
                <Text>You don't have any favorites yet</Text>}
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
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#00AFF0',
    },
})

export default Favorites

