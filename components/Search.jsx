import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Avatar, SearchBar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { API } from '../helpers/Const'
import { getFromApi } from '../helpers/hooks'
import Loading from './Loading'

const Search = ({ navigation }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const ref = React.useRef(null);
    // const [visible, setVisible] = useState(false)

    const search = (q) => {
        const query = q.trim()
        if (query.length > 2) {
            setResults([]);
            setLoading(true);
            getFromApi(API.search(query)).then(res => {
                // console.log(res)
                setResults(res)
                setLoading(false)
            })
        }
    }


    useEffect(() => {
        search(query)
        ref.current.focus()
        return () => {
            // cleanup
            setResults([])
        }
    }, [query])

    const SearchList = () => {
        return loading ? 
            <Loading /> : <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                const { img, title, synopsis, id } = item;
                let summary = synopsis.replace('Plot Summary: ', '').substring(0, 120) + '...';
                return (
                    <ListItem bottomDivider onPress={(e) => {
                        navigation.push('AnimeDetail', item)
                    }}>
                        <Avatar source={{ uri: img }} containerStyle={styles.avatar} />
                        <ListItem.Content>
                            <ListItem.Title>{title}</ListItem.Title>
                            <ListItem.Subtitle>{summary}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            }}/>
    }

    return (
        <View style={styles.container}>
            <SearchBar
                ref={ref}
                placeholder="Type Here..."
                onChangeText={(text) => setQuery(text)}
                value={query}
                round={true}
                lightTheme={true}
            />

            <SearchList />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        // width: '80%',
        backgroundColor: '#f0f0f7',
        // padding: 20,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    avatar: {
        width: 80,
        height: 120,
        borderRadius: 5,
    }
})

export default Search
