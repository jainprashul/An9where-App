import React from 'react'
import { FlatList, Image, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Carousel from 'react-native-snap-carousel';

function Banner({ data, navigation }) {
    return (
        <FlatList
            data={data}
            // style={{ flex: 1 }}
            renderItem={({ item }) => (
                <View style={styles.carousel} >
                    <TouchableOpacity onPress={() => navigation.push('AnimeDetail', item)}>
                        <Image source={{ uri: item.img }} style={styles.poster} />
                        <Text style={styles.carouselText}>{item.title}</Text>
                    </TouchableOpacity>

                </View>
            )}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
        />
        // <Carousel
        //   data={data}
        //   renderItem={({ item }) => (
        //     <View style={styles.carousel} >
        //       <TouchableOpacity onPress={() => navigation.push('AnimeDetail', item)}>
        //         <Image source={{ uri: item.img }} style={styles.poster} />
        //        <Text style={styles.carouselText}>{item.title}</Text>
        //      </TouchableOpacity>
        //     </View>

        //   )}
        //   sliderWidth={ScreenWidth}
        //   itemWidth={ScreenWidth - 40}
        //   />

    );
}



const styles = StyleSheet.create({
    home: {
        // padding: 10
    },
    carousel: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    poster: {
        // flex: 1,
        width: ScreenWidth - 40,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    carouselText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        textShadowColor: '#aaa',
        // textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
    }
})



export default Banner;
