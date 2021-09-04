import React, { useEffect } from 'react'
import { StyleSheet, View, Button, Image, ScrollView } from 'react-native'
import { Card, Divider, Text } from 'react-native-elements'
import { Chip } from 'react-native-elements'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import LocalStorage from '../helpers/LocalStorage'

const AnimeDetail = ({ route, navigation }) => {

    const { id, title, synopsis, img, genres, status, otherName, released, totalEpisodes, episodes } = route.params
    const [playEps, setPlayEps] = React.useState(null) // episode to play
    const [isFavorite, setIsFavorite] = React.useState(false) // check if anime is favorite
    const [playedEpisodes, setPlayedEpisodes] = React.useState([]) // array of episodes that have been played

    //   console.log(img);
    // console.log(ScreenWidth);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: title 
        })
        LocalStorage.getObject('watching').then(data => {
            if (data) {
                let q = data[id]
                if (q) {
                    setPlayEps(q.currentPlaying) // set episode to play
                    setPlayedEpisodes(q.playedEpisodes) // set played episodes
                }
            }
        })
    }, [title, playEps])

    return (
        <ScrollView style={styles.container}>
            <Card>
                <Image source={{ uri: img }} style={styles.poster} />
                <Button title={playEps ? `Play Episode-${playEps}` : `Watch Now`} onPress={() => navigation.navigate('Episode', { anime: route.params, playedEpisodes, currentPlaying: playEps ? playEps : 1 })} />
                <Divider orientation='horizontal' />
                <Text h3 style={styles.title}>{title}</Text>
                <Text h4 style={styles.altTitle}>{otherName}</Text>
                <View style={styles.chipBox}>
                    {
                        genres.map((item, index) => {
                            return (
                                <View key={index} style={styles.chip}>
                                    <Chip type='outline' title={item} onPress={() => { navigation.navigate('Genre', { genre: item }) }} />
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.details}>
                    <Text >Status: {status}</Text>
                    <Text >Released: {released}</Text>
                    <Text >Total Episodes: {totalEpisodes}</Text>

                </View>

                {/* <Chip type="outline">{}</Chip> */}
                <Text style={styles.description}>{synopsis}</Text>


            </Card>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    title: {
        // fontSize: 20,
        // textAlign: 'center',
        // margin: 10,
    },
    description: {
        fontSize: 15,
        marginVertical: 10,
    },
    poster: {
        width: ScreenWidth * 0.85,
        height: 300,
        resizeMode: 'cover'
    },
    altTitle: {
        color: '#777',
    },
    chipBox: {
        // flex : 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    chip: {
        margin: 6,
    },
})



export default AnimeDetail
