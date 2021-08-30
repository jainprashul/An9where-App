import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import AniGrid from '../components/AniGrid';
import { API } from '../helpers/Const';
import { getFromApi } from '../helpers/hooks';

const Home = ({ navigation }) => {

  const [Popular, setPopular] = useState([]);
  const [Ongoing, setOngoing] = useState([]);
  const [NewSeasons, setNewSeasons] = useState([]);
  const [Banner, setBanner] = useState([]);

  navigation.setOptions({

    headerRight: () => (
      <Icon name='favorite' size={30} color='#3399FF' onPress={() => navigation.navigate('Favorites')} />
    )
  });

  const fetchData = () => {

    let query = [
      fetch(API.popular),
      fetch(API.ongoing),
      fetch(API.newSeasons(1)),
    ]
    console.log(query);
    Promise.all(query).then((responses) => (
      // Get a JSON object from each of the responses
      Promise.all(responses.map((response) => (response.json()))))).then((data) => {
        console.log(data);
        setPopular(data[0]);
        setOngoing(data[1]);
        setNewSeasons(data[2]);
        setBanner(data[0].slice(0, 7))
        console.log('fetched');
      }).catch((error) => {
        console.error(error);
        console.log('ReFetching Now');
        fetchData();
      });
  }

  const getAnime = () => {


    getFromApi(API.popular).then((movies) => {
      setPopular(movies);
    });
    getFromApi(API.ongoing).then((movies) => {
      setOngoing(movies);
    });
    getFromApi(API.newSeasons(1)).then((movies) => {
      setNewSeasons(movies);
    }
    );
  }

  useEffect(() => {
    getAnime();
  }, [])

  return (
    <View style={styles.home}>
      {/* <Button title="Go to Favorites" onPress={} />  */}
      <AniGrid data={Popular} />
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    // padding: 10
  }
})

export default Home


