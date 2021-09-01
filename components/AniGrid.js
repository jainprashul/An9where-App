import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Button, Text, Icon } from 'react-native-elements'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import Loading from './Loading';


const AniCard = ({anime}) => {
    let { img, title, id } = anime;
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => { navigation.push('AnimeDetail', anime)}}>
            <Card containerStyle={styles.container}>
                <Card.Title>{title}</Card.Title>
                {/* <Card.Divider /> */}
                <Image source={{ uri: img }} style={styles.cardImg} />
            </Card>
        </TouchableOpacity>

    )
}

const CardHeader = (title) => {
    return (
        <Button title={title} disabled disabledStyle={styles.header} disabledTitleStyle={{color: '#fff'}}  buttonStyle={styles.header}>
        </Button>
    )
}

const AniGrid = ({ data , title }) => {

    if (data.length > 0) {
        return (
            <FlatList
                data={data}
                renderItem={({ item }) => <AniCard anime={item} />}
                keyExtractor={(item, index) => item.id}
                numColumns={2}
                ListHeaderComponent={CardHeader(title)}
            />
        )

    } else {
        return (
            <Loading />
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        width: ScreenWidth/2 - 10,
        marginHorizontal : 5
    },
    header: {
        justifyContent: 'center',

        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        // borderRadius: 5,
        width: ScreenWidth,
        backgroundColor: '#3399FF',
        // tintColor: '#fff',

    },

    ListHeaderText: {

        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        letterSpacing: 0.5,
        // marginBottom: -15


    },
    cardImg: {
        flex: 1,
        resizeMode: 'cover',
        width: (ScreenWidth/2) - 20,
        height: 200,
        // borderRadius: 100,
        // marginBottom: 10,
    },

});

export default AniGrid
