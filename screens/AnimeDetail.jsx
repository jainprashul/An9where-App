import React, { useEffect } from 'react'
import { StyleSheet, View, Button, Image, ScrollView } from 'react-native'
import { Card, Divider, Text } from 'react-native-elements'
import { Chip } from 'react-native-elements'
import { ScreenWidth } from 'react-native-elements/dist/helpers'

const AnimeDetail = ({route, navigation}) => {
  
  const {id, title, synopsis, img, genres, status, otherName, released, totalEpisodes, episodes} = route.params

//   console.log(img);
// console.log(ScreenWidth);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: title
          })
    }, [title])

  return (
    <ScrollView style={styles.container}>
      <Card>
      <Image source={{uri: img}} style={styles.poster}/>

          <Button title="Watch Now" onPress={() => navigation.navigate('Episode', {id, title, episodes})}/>         
          
          <Divider orientation='horizontal'  />
          <Text h3 style={styles.title}>{title}</Text>
          <Text h4 style={styles.altTitle}>{otherName}</Text>
          <View style={styles.chipBox}>
          {
              genres.map((item, index) => {
                  return (
                    <View key={index} style={styles.chip}>
                        <Chip type='outline' title={item} onPress={()=>{navigation.navigate('Genre', {genre : item})}} />
                    </View>
                  )})
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
        margin: 2,
    },

    
})



export default AnimeDetail
