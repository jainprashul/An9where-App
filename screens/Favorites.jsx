import React, { useEffect } from 'react'

import { StyleSheet, View, Text, Button, Image } from 'react-native'
import AniGrid from '../components/AniGrid'
import LocalStorage from '../helpers/LocalStorage';

const Favorites = ({ route }) => {
    // const { button , description , image , title} = route.params
    const [favorites, setFavorites] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [watchlist, setWatchlist] = React.useState([])

    useEffect(() => {
        LocalStorage.getObject('favorites').then(data => {
            let res = data ? [...data] : []
            setFavorites(res)
            setIsLoading(false)
        })

        LocalStorage.getObject('watching').then(data => {
            // console.log('raw', data);
            let res = data ? { ...data } : {}
            const keys = Object.keys(res);
            let watched = [];
            keys.forEach((key) => {
                let d = res[key];
                if (d.totalEpisodes <= d.currentPlaying || d.totalEpisodes == null) watched.push(d);
            })
            setWatchlist(watched)
            // console.log('upas', watched);
            setIsLoading(false)
        })

    }, [])

    return (
        <View style={styles.container}>
            {favorites.length ? <AniGrid data={favorites} title="Favorites" />
                :
                <View style={styles.textBox}>
                    <Text>You don't have any favorites yet</Text>
                </View>
            }
            {watchlist.length ? <AniGrid data={watchlist} title="Watching" />
                :
                <View style={styles.textBox}>
                    <Text>You don't have watched anything yet</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    textBox: {
        marginTop: 50,
        flex: 1,
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

