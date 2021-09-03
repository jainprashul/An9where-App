import React, { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, TouchableOpacityBase, VirtualizedList } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Carousel from 'react-native-snap-carousel';
import AniGrid from '../components/AniGrid';
import Banner from '../components/Banner';
import Loading from '../components/Loading';
import { API } from '../helpers/Const';
import { getFromApi } from '../helpers/hooks';
import LocalStorage from '../helpers/LocalStorage';

const Home = ({ navigation }) => {

  const [Popular, setPopular] = useState([]);
  const [Ongoing, setOngoing] = useState([]);
  const [NewSeasons, setNewSeasons] = useState([]);
  const [Recent, setRecent] = useState([]);
  const [BannerData, setBanner] = useState([]);



  const getAnime = () => {
    LocalStorage.getMultipleObjects(['Popular', 'Ongoing', 'NewSeasons', 'Recent']).then((data) => {
      setPopular(data[0]);
      setOngoing(data[1]);
      setNewSeasons(data[2]);
      setRecent(data[3]);
      setBanner(data[2].slice(0, 7));
      console.log('Loaded from Cache');
    }).catch((error) => {
      console.log(error);
    });

    getFromApi(API.popular).then((movies) => {
      LocalStorage.setObject('Popular', movies);
      setPopular(movies);
    });
    getFromApi(API.ongoing).then((movies) => {
      LocalStorage.setObject('Ongoing', movies);
      setOngoing(movies);
    });
    getFromApi(API.newSeasons(1)).then((movies) => {
      LocalStorage.setObject('NewSeasons', movies);
      setNewSeasons(movies);
      setBanner(movies.slice(0, 7));
    });
    getFromApi(API.recent_eps).then((movies) => {
      LocalStorage.setObject('Recent', movies);
      setRecent(movies);
    });
    
  }

  useEffect(() => {
    getAnime();
    console.log('Data Fetched');
  }, []);

  return (
    <ScrollView>
      {/* <Button title="Go to Favorites" onPress={} />  */}

      <Banner data={BannerData} navigation={navigation} />
      <AniGrid data={Popular} title={"Popular Anime"} horizontal />
      <AniGrid data={Ongoing} title={"Ongoing Anime"} horizontal />
      <AniGrid data={NewSeasons} title={"New Seasons"} horizontal />
      <AniGrid data={Recent} title={"Recently Added Episodes"}  />
    </ScrollView>
  )
}

export default Home


