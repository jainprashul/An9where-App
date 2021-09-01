import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScreenHeight } from 'react-native-elements/dist/helpers'

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView source={require('../assets/animations/loading.json')} autoPlay loop
                style={styles.lottie} />
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        marginVertical: ScreenHeight / 2 - 50,
        width: 200,
        height: 200
    },
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})

export default Loading
