import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native';
import { StyleSheet, View, Text, Button } from 'react-native'
import { BottomSheet, Icon, ListItem } from 'react-native-elements';
import AniGrid from '../components/AniGrid';
import { API, GENRE } from '../helpers/Const';
import { getFromApi } from '../helpers/hooks';

const Genre = ({ navigation, route }) => {

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const { genre } = route.params;

    useEffect(() => {
        getAnime(genre);
        navigation.setOptions({
            headerRight: () => (
                <Icon name='filter' type='material-community' onPress={() => setVisible(true)} />
            ),
            headerTitle: 'Genre - ' + getGenreName(genre)

        })
    }, [genre])


    const getGenreName = (genre) => {
        let genreName = genre.replace('-', ' ');
        return upperCaseEachWord(genreName);
    }

    const getAnime = (genre, page = 1) => {
        setLoading(true);
        getFromApi(API.genre(genre, page)).then((anime) => {
            setAnimes(anime);
            setLoading(false);
        });
    }

    const GenreList = () =>{ 
        return(
        <FlatList
                data={GENRE}
                keyExtractor={(item, index) => item.genre}
            renderItem={({ item }) => (
                <ListItem bottomDivider onPress={ ()=>{
                    setAnimes([]);
                    navigation.setParams({ genre: item.genre });
                    setVisible(false);
                } }>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            )}            
        />
        
    )}






    return (
        <View style={styles.home}>
            {/* <Button title="Go to Favorites" onPress={} />  */}
            <BottomSheet isVisible={visible}
                modalProps={{
                    onRequestClose: () => setVisible(false),
                }}
                containerStyle={styles.bottomSheet}>
            
            <ListItem bottomDivider
                containerStyle={{backgroundColor:"red"}}
             onPress={ ()=>{
                    setVisible(false);
                } }>
                    <ListItem.Content>
                        <ListItem.Title style={{color:'white'}}>Cancel</ListItem.Title>
                    </ListItem.Content>
                    {/* <ListItem.Chevron /> */}
            </ListItem>
            <GenreList />

            
            </BottomSheet>
            <AniGrid data={animes} title={`${getGenreName(genre)} Anime`} />
            

        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        // padding: 10
    },
    bottomSheet: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    }

})


const upperCaseEachWord = (str) => {    
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Genre