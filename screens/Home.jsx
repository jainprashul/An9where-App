import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import AniGrid from '../components/AniGrid';
import Loading from '../components/Loading';
import { API } from '../helpers/Const';
import { getFromApi } from '../helpers/hooks';

const Home = ({ navigation }) => {

  const [Popular, setPopular] = useState([]);
  const [Ongoing, setOngoing] = useState([]);
  const [NewSeasons, setNewSeasons] = useState([]);
  const [Recent, setRecent] = useState([]);
  const [Banner, setBanner] = useState([]);


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
        setBanner(data[2].slice(0, 7));
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
    });
    getFromApi(API.recent_eps).then((movies) => {
      setRecent(movies);
    });
    
  }

  useEffect(() => {
    getAnime();
    console.log('Data Fetched');
  }, []);

  return (
    <ScrollView style={styles.home}>
      {/* <Button title="Go to Favorites" onPress={} />  */}
      <Carousel data={Banner} />
      <AniGrid data={Popular} title={"Popular Anime"} horizontal />
      <AniGrid data={Ongoing} title={"Ongoing Anime"} horizontal />
      <AniGrid data={NewSeasons} title={"New Seasons"} horizontal />
      <AniGrid data={Recent} title={"Recently Added Episodes"}  />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  home: {
    // padding: 10
  }
})

function Carousel({data}) {
  return (
    <FlatList
      data={data}
      // style={{ flex: 1 }}
      renderItem={({ item }) => (
        <View style={styles.carousel}>
          <Text style={styles.carouselText}>{item.title}</Text>
          <Text style={styles.carouselText}>{item.description}</Text>
        </View>
      )}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default Home


