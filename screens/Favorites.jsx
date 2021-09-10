import React, { useEffect } from 'react'

import { StyleSheet, View, Text, Image, ScrollView, FlatList } from 'react-native'
import { Avatar, Button, ListItem } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import AniGrid from '../components/AniGrid'
import Loading from '../components/Loading';
import LocalStorage from '../helpers/LocalStorage';
import useFavorites from '../helpers/useFavorites';

const Favorites = ({ route, navigation }) => {
    // const { button , description , image , title} = route.params
    const [favorites, setFavorites] = React.useState([])
    const [watchlist, setWatchlist] = React.useState([])

    useEffect(() => {
        LocalStorage.getObject('favorites').then(data => {
            let res = data ? [...data] : []
            setFavorites(res)
        })

        LocalStorage.getObject('watching').then(data => {
            let res = data ? { ...data } : {}
            console.log('raw', res);

            const keys = Object.keys(res);
            let watched = [];
            keys.forEach((key) => {
                let d = res[key];
                console.log(d);
                // watched.push(d);
                if (d.totalEpisodes >= d.currentPlaying || d.totalEpisodes == null) watched.push(d);
            })
            // console.log('watched', watched);
            setWatchlist(watched)
        })

    }, [])


    const removeFromWatchList = (id) => {
        LocalStorage.getObject('watching').then(data => {
            let res = data ? { ...data } : {}
            delete res[id];
            LocalStorage.setObject('watching', res);
            const keys = Object.keys(res);
            let watched = [];
            keys.forEach((key) => {
                let d = res[key];
                console.log(d);
                // watched.push(d);
                if (d.totalEpisodes >= d.currentPlaying || d.totalEpisodes == null) watched.push(d);
            })
            setWatchlist(watched)
        }
        )
    }

    const Item = ({ item, headerTitle }) => {
        const { img, title, synopsis, id } = item;
        const { removeFromFav } = useFavorites(item)
        let summary = synopsis.replace('Plot Summary: ', '').substring(0, 120) + '...';
        return (
            <ListItem.Swipeable bottomDivider onPress={(e) => {
                navigation.push('AnimeDetail', item)
            }} rightContent={
                (headerTitle == "Favorites") ? <Button
                    title="Delete"
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    onPress={() => { removeFromFav(setFavorites) }} 
                /> :
                    <Button
                        title="Done"
                        icon={{ name: 'check-circle', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'green' }}
                        onPress={() => { removeFromWatchList(id) }} 
                    />
            }
            >
                <Avatar source={{ uri: img }} containerStyle={styles.avatar} />

                <ListItem.Content>
                    <ListItem.Title>{title}</ListItem.Title>
                    <ListItem.Subtitle>{summary}</ListItem.Subtitle>
                </ListItem.Content>
                {/* </ListItem.Swipeable> */}
            </ListItem.Swipeable>
        )

    }

    const List = ({ data, title: headerTitle }) => {
        return <>
            <Button title={headerTitle}  disabledStyle={styles.header} disabledTitleStyle={{ color: '#fff' }} buttonStyle={styles.header}>
            </Button>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <Item item={item} headerTitle={headerTitle} />
                }} />
        </>
    }

    return (
        <ScrollView style={styles.container}>
            {favorites.length ? <List data={favorites} title="Favorites" />
                :
                <View style={styles.textBox}>
                    <Text>You don't have any favorites yet</Text>
                </View>
            }
            {watchlist.length ? <List data={watchlist} title="Watching" />
                :
                <View style={styles.textBox}>
                    <Text>You don't have watched anything yet</Text>
                </View>
            }
        </ScrollView>
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
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        width: ScreenWidth,
        backgroundColor: '#3399FF',
    },
    avatar: {
        width: 80,
        height: 120,
        borderRadius: 5,
    }
})

export default Favorites

