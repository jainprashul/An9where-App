import React, { useEffect } from 'react'
import { StyleSheet, View,  Image, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Divider, Button, Text } from 'react-native-elements'
import { Chip } from 'react-native-elements'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import LocalStorage from '../helpers/LocalStorage'
import useFavorites from '../helpers/useFavorites'
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Analytics from 'expo-firebase-analytics';


const AnimeDetail = ({ route, navigation }) => {

    console.log(route);

    const { id, title, synopsis, img, genres, status, otherName, released, totalEpisodes, episodes } = route.params
    const [playEps, setPlayEps] = React.useState(null) // episode to play
    const [isFavorite, setIsFavorite] = React.useState(false) // check if anime is favorite
    const [playedEpisodes, setPlayedEpisodes] = React.useState([]) // array of episodes that have been played
    const { addToFav, showAddBtn } = useFavorites(route.params)

    const refIcon = React.useRef(null)

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
        Analytics.logEvent('Anime_Detail_Screen', {
            screen: 'Anime_Detail_Screen',
            anime_id: id,
            anime_title: title,
            anime_img: img,
            anime_genres: genres,
            isFavorite: isFavorite,
            
        }),
        Analytics.setCurrentScreen(`Anime_Detail_Screen_${title}`);
        
    }, [title, playEps])

    const FavIcon = () => (
        <TouchableOpacity disabled={!showAddBtn} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={(e) => {
            refIcon.current.play()
        }}>
            <LottieView source={require('../assets/animations/55154-favourite-icon.json')}
                ref={refIcon}
                style={{ height: 80, width: 80 }}
                loop={false}
                progress={showAddBtn ? 0 : 1}
                onAnimationFinish={() => {
                    addToFav(route.params)
                }}
                
            />
        </TouchableOpacity>
    )

    return (
        <ScrollView style={styles.container}>
            <Card>
                <Image source={{ uri: img }} style={styles.poster} />
                <View style={styles.bBox}>
                    <Button title={playEps ? `Play Episode-${playEps}` : `Watch Now`}
                        icon={<Ionicons name="play" size={20} color="white" />}
                        raised containerStyle={{ ...styles.watchBtn, margin: 10}} buttonStyle={styles.watchBtn}
                        onPress={() => navigation.navigate('Episode', { anime: route.params, playedEpisodes, currentPlaying: playEps ? playEps : 1 , setPlayEps})} />
                    <FavIcon />
                    </View>
                
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
    bBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // margin: 10,
    },
    watchBtn: {
        backgroundColor: '#00b894',
        width: ScreenWidth * 0.6,
        height: 40,
        borderRadius: 20,
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
