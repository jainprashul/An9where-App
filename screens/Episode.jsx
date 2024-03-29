import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, ScrollViewBase, StatusBar, ToastAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Text, Chip, Icon } from 'react-native-elements';
import Player from '../components/Player';
import VideoPlayer from '../components/VideoPlayer';
import { API } from '../helpers/Const'
import LocalStorage from '../helpers/LocalStorage';
import Loading from '../components/Loading';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import useFavorites from '../helpers/useFavorites';
import AnimatedLottieView from 'lottie-react-native';
import useFullscreen from '../helpers/useFullscreen';
import * as Analytics from 'expo-firebase-analytics';
import * as FacebookAds from 'expo-ads-facebook';

const Episode = ({ route, navigation }) => {
  const { currentPlaying, anime, playedEpisodes = [], setPlayEps } = route.params;
  const { episodes, id: oldID, title, synopsis, img, totalEpisodes } = anime;

  const epsList = episodes?.length ? episodes : Array.from(Array(totalEpisodes).keys());

  // let totalEpisodes = episodes.length;
  const [videoLink, setVideoLink] = useState({});
  const [videosQuality, setVideosQuality] = useState({});
  const [videoQ , setVideoQ] = useState({});
  const [link, setLink] = useState('')
  const [episodeNo, setEpisodeNo] = useState(currentPlaying);
  const [error, setError] = useState(<Text></Text>)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollLock, setScrollLock] = useState(false)
  const { addToFav, showAddBtn } = useFavorites(anime)

  const refIcon = React.useRef(null);

  const getEpisodes = () => {
    const url = oldID.split('-episode-')[0].replace('/', '').trim();
    const query = [
      fetch(API.iframe(url, `episode-${episodeNo}`)),
      fetch(API.iframeDub(url, `episode-${episodeNo}`))
    ]

    Promise.all(query).then((responses) => (
      // Get a JSON object from each of the responses
      Promise.all(responses.map((response) => (response.json()))))).then((data) => {
        let sub = data[0]
        let dub = data[1]
        // console.log(sub, dub);
        if (!sub.servers?.length) setError(() => (<View style={styles.errorBox} >
          <Text style={styles.errorTitle} >Error 404</Text>
          <Text>The Requested page does not exist</Text>
        </View>));

        let videosQualityDict = {
          sub: sub.videos,
          dub: dub.videos,
        }
        setVideosQuality(videosQualityDict);

        let videoLinks = {
          sub: sub.servers[1] ? sub.servers[1]["iframe"] : null,
          dub: dub.servers[1] ? dub.servers[1]['iframe'] : null,
          subOthers: sub.servers.length ? sub.servers :[],
          dubOthers: dub.servers.length ? dub.servers :[]
        }
        setVideoLink(videoLinks)

        let vLink = dub.servers[1] ? dub.servers[1]['iframe'] : (sub.servers[1] ? sub.servers[1]["iframe"] : null)
        setLink(vLink)
        let videoQ = dub.servers[1] ? dub.videos : sub.videos
        setVideoQ(videoQ)
        savingEpisode();
      }).catch((error) => {
        console.log("Error : ", error);
        ToastAndroid.showWithGravity("Error : Fetching, Please load after sometime", ToastAndroid.SHORT, ToastAndroid.TOP);
        getEpisodes();
      });
  }

  // console.log(playedEpisodes);
  const savingEpisode = (player) => {
    playedEpisodes.includes(episodeNo) ? null : playedEpisodes.push(episodeNo);
    let state = {
      ...anime,
      currentPlaying: episodeNo,
      name: title,
      img,
      id: oldID.split('-episode-')[0].replace('/', '').trim(), // id of the anime without episode
      totalEpisodes,
      playedEpisodes,
      currentTime: player?.currentTime || 0,
      progress: player ? (player.currentTime / player.duration) * 100 : 0
    }
    // !player && console.log('Saving', state);
    LocalStorage.getObject('watching').then((data) => {
      // console.log('locaal',data);
      let watchList = data ? data : {};
      watchList[state.id] = state;

      // console.log('updaye', watchList);
      LocalStorage.setObject('watching', watchList);
    })
    
  }

  const clearAll = () => {
    setVideoLink({});
    setVideosQuality({});
    setVideoQ({});
    setLink('');
    setEpisodeNo(currentPlaying);
    setSelectedIndex(0);
    setScrollLock(false);
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Episode ${episodeNo} - ${title}`
    })
    getEpisodes();

    Analytics.setCurrentScreen('Episode' + title + '-EP-' + episodeNo);
    Analytics.logEvent('Episode' + title + '-EP-' + episodeNo + '-View', {
      episodeNo,
      title,
      id: oldID.split('-episode-')[0].replace('/', '').trim(),
      totalEpisodes,
      playedEpisodes,
    });
    FacebookAds.InterstitialAdManager.showAd('1056426911773868_1056441078439118')
      .then(didClick => { })
      .catch(error => { });
    // const backButton = backButtonHandle();
    return () => {
      clearAll();
      setPlayEps(episodeNo);
      // backButton.remove();
      console.log('Unmounting EPS');
    }    
  }, [episodeNo])

  console.log(episodeNo, videoLink);
  // console.log(playedEpisodes);

  const FavIcon = () => (
    <TouchableOpacity disabled={!showAddBtn} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={(e) => {
      refIcon.current.play()
    }}>
      <AnimatedLottieView source={require('../assets/animations/55154-favourite-icon.json')}
        ref={refIcon}
        style={{ height: 80, width: 80 }}
        loop={false}
        progress={showAddBtn ? 0 : 1}
        onAnimationFinish={() => {
          addToFav(anime)
        }}

      />
    </TouchableOpacity>
  )

  return (
    <ScrollView 
      scrollEnabled={!scrollLock}
    >
      {/* <View style={styles.playerBox}> */}
        {link?.length ? <VideoPlayer link={link} videoQ={videoQ} scroll={{scrollLock, setScrollLock}} /> : <Loading />}
      {/* </View> */}
      <View style={styles.container}>
        <View style={styles.playerDash}>
          <Icon name="play-skip-back-sharp" type="ionicon" onPress={() => {
            let ep = (episodeNo - 1) < 1 ? 1 : (episodeNo - 1)
            setEpisodeNo(ep);
          }} />
          <Chip title={'Episode - ' + episodeNo} />
          <Icon name="play-skip-forward-sharp" type="ionicon" onPress={() => {
            let ep = (episodeNo + 1) > totalEpisodes ? totalEpisodes : (episodeNo + 1);
            setEpisodeNo(ep);
          }} />
        </View>
        {videoLink.dub ? <ButtonGroup
          onPress={(index) => {
            setSelectedIndex(index);
            if (index === 0) {
              setLink(videoLink.dub);
              setVideoQ(videosQuality.dub);
              
            } else {
              setLink(videoLink.sub);
              setVideoQ(videosQuality.sub);
            }
            console.log(index, videoLink);
          }}
          selectedIndex={selectedIndex}
          buttons={["DUB", "SUB"]}
          containerStyle={{ borderRadius: 10, height: 50 }}
          selectedButtonStyle={{ backgroundColor: '#3399FF' }}
        /> : null}

        <View style={styles.bBox}>
          <Text style={styles.title}>{title}</Text>
          <FavIcon />
          </View>
        <Text style={styles.episode}>Episode {episodeNo}</Text>
        <Text style={styles.description}>{synopsis}</Text>
        <View style={styles.chipBox}>
          {epsList.map((item, index) => {
            const isPlayed = playedEpisodes.includes((index + 1));
            // console.log(isPlayed, index + 1);
            return (
              <View key={index} style={styles.chip}>
                <Chip type='outline' title={'EP-' + (index + 1)} buttonStyle={isPlayed ? styles.played : styles.unplayed} titleStyle={isPlayed ? styles.played : styles.unplayed} onPress={() => {
                  let ep = (index + 1)
                  setEpisodeNo(ep);
                  // getEpisodes();
                }} />
              </View>
            )
          })}
        </View>
      </View>
      {error}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // marginTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    width: ScreenWidth * 0.8,
  },
  errorBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'red',
  },
  bBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chip: {
    margin: 4,
  },
  playerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenWidth * 0.5625,
    backgroundColor: '#000',
    marginTop: StatusBar.currentHeight
  },
  episode: {
    // fontSize: 15,
    // fontWeight: 'bold',
    // marginVertical: 10,
  },
  played: {
    // backgroundColor: '#000',
    borderColor: '#666',
    color: '#666',
  },
  playerDash: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});
export default Episode