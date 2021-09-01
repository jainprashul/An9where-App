import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Player from '../components/Player';
import VideoPlayer from '../components/VideoPlayer';
import { API } from '../helpers/Const';

const Episode = ({ route, navigation }) => {

  const { episodes, id, title } = route.params;

  const [link, setLink] = useState('')
  const [episodeNo, setEpisodeNo] = useState('episode-1')
  const [error, setError] = useState(<Text></Text>)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const getEpisodes = () => {
    const query = [
      fetch(API.iframe(id, episodeNo)),
      fetch(API.iframeDub(id, episodeNo))
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

        let videoFrames = {
          subs: sub.servers[1] ? sub.frame : null,
          dubs: dub.servers[1] ? dub.frame : null,
        }

        let vLink = dub.servers[1] ? dub.servers[1]['iframe'] : (sub.servers[1] ? sub.servers[1]["iframe"] : '')
        setLink(vLink)

      }).catch((error) => {
        console.error("Error : ", error);
      });


  }

  useEffect(() => {
    navigation.setOptions({
      title: `Episode ${episodeNo.split('-')[1]} - ${title}`
    })
    getEpisodes();
  }, [])


  return (
    <View>
      <View style={styles.playerBox}>
        {/* {link.length ? <Player link={link} /> : null} */}

      </View>
      <View style={styles.container}>
        <ButtonGroup
          onPress={(index) =>{
            setSelectedIndex(index);
            console.log(index);
          }}
          selectedIndex={selectedIndex}
          buttons={["DUB", "SUB"]}
          containerStyle={{ borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff' }}
          selectedButtonStyle={{ backgroundColor: '#3399FF' }}
        />
                <Text style={styles.title}>{title}</Text>
        <Text style={styles.episode}>Episode {episodeNo.split('-')[1]}</Text>

        
      </View>

      {error}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: StatusBar.currentHeight
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
});
export default Episode