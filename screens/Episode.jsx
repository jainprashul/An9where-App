import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, ScrollViewBase, StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup, Chip, Icon } from 'react-native-elements';
import Player from '../components/Player';
import VideoPlayer from '../components/VideoPlayer';
import { API } from '../helpers/Const'
import LocalStorage from '../helpers/LocalStorage';
import Loading from '../components/Loading';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const Episode = ({ route, navigation }) => {
  const { currentPlaying, anime, playedEpisodes = [] } = route.params;
  const { episodes, id, title, synopsis, img, totalEpisodes } = anime;

  // let totalEpisodes = episodes.length;
  const [videoLink, setVideoLink] = useState({});
  const [videosQuality, setVideosQuality] = useState({});
  const [videoQ , setVideoQ] = useState({});
  const [link, setLink] = useState('')
  const [episodeNo, setEpisodeNo] = useState(currentPlaying);
  const [error, setError] = useState(<Text></Text>)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const getEpisodes = () => {
    const query = [
      fetch(API.iframe(id, `episode-${episodeNo}`)),
      fetch(API.iframeDub(id, `episode-${episodeNo}`))
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
        console.log(videosQualityDict);
        setVideosQuality(videosQualityDict);

        let videoLinks = {
          sub: sub.servers[1] ? sub.servers[1]["iframe"] : null,
          dub: dub.servers[1] ? dub.servers[1]['iframe'] : null,
        }
        setVideoLink(videoLinks)

        let vLink = dub.servers[1] ? dub.servers[1]['iframe'] : (sub.servers[1] ? sub.servers[1]["iframe"] : null)
        setLink(vLink)
        let videoQ = dub.servers[1] ? dub.videos : sub.videos
        setVideoQ(videoQ)
        savingEpisode();
      }).catch((error) => {
        console.error("Error : ", error);
      });
  }

  // console.log(playedEpisodes);
  const savingEpisode = (player) => {
    playedEpisodes.includes(episodeNo) ? null : playedEpisodes.push(episodeNo);
    let state = {
      currentPlaying: episodeNo,
      name: title,
      img,
      id,
      totalEpisodes,
      playedEpisodes
    }

    if (player) {
      state = {
        currentPlaying: episodeNo,
        name: title,
        img,
        id,
        totalEpisodes,
        playedEpisodes,
        currentTime: player.currentTime,
        progress: (player.currentTime / player.duration) * 100,
      }
    }

    LocalStorage.getObject('watching').then((data) => {
      // let watchList = data ? data : {};
      let watchList = {};
      watchList[id] = state;
      LocalStorage.setObject('watching', watchList);
    })
    !player && console.log('Saving', state);
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Episode ${episodeNo} - ${title}`
    })
    getEpisodes();
    return () => {
      setVideoLink({});
      setLink('');
      console.log('Unmounting EPS');
    }
  }, [episodeNo])

  console.log(episodeNo, videoLink);
  // console.log(playedEpisodes);

  return (
    <ScrollView>
      <View style={styles.playerBox}>
        {link.length ? <VideoPlayer link={link} videoQ={videoQ} /> : <Loading />}
      </View>
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
            // (index === 0) ? setLink(videoLink.dub) : setLink(videoLink.sub)
            // (index === 0) ? setVideosQuality(videosQuality.dub) : setVideosQuality(videosQuality.sub)
            console.log(index, videoLink);
          }}
          selectedIndex={selectedIndex}
          buttons={["DUB", "SUB"]}
          containerStyle={{ borderRadius: 10, height: 50 }}
          selectedButtonStyle={{ backgroundColor: '#3399FF' }}
        /> : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.episode}>Episode {episodeNo}</Text>
        <Text style={styles.description}>{synopsis}</Text>
        <View style={styles.chipBox}>
          {episodes.map((item, index) => {
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
    fontSize: 20,
    fontWeight: 'bold',
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
    // marginTop: StatusBar.currentHeight
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