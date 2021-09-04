import { Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { API } from '../helpers/Const'
import { getFromApi } from '../helpers/hooks';

const VideoPlayer = ({ link }) => {

    const video = useRef(null)
    let overlay = true
    const [videoLinks, setVideoLinks] = useState({ hd: '', sd: '' })
    const [paused, setPaused] = useState(false)
    const [status, setStatus] = React.useState({});

    useEffect(() => {
        console.log("Link: ", link);
        
        getFromApi(API.videoLink(link)).then((data) => {
            let videoLink = {
                hd: data.iframeUrl[0].url,
                sd: data.iframeUrl[1].url,
            }
            console.log(videoLink);
            setVideoLinks(videoLink);
        })
        console.log('Player loaded');
        return () => {
            console.log('Player unmounted');
        }
        }, [])
        


    const playPause = () => {
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        setPaused(!paused)
    }

    const youtubeSeekLeft = (value=10000) => {
        let pos = status.positionMillis - 10000 // remove 10000 to go back 10 seconds
        console.log(pos);

        video.current.playFromPositionAsync(pos)
    }

    const youtubeSeekRight = (value=10000) => {
        let pos = status.positionMillis + 10000  // added 10 seconds to the current position
        console.log(pos);

        video.current.playFromPositionAsync(pos)
    }

    return (
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: videoLinks.hd,
                }}
                resizeMode="contain"
                shouldPlay

                
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            
            <View style={styles.overlay}>
                {!overlay ? <View style={{ ...styles.overlaySet, backgroundColor: '#0006' }}>

                </View> :
                <View style={styles.overlaySet}>
                    <TouchableNativeFeedback onPress={youtubeSeekLeft}><View style={{ flex: 1 }}></View></TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={youtubeSeekRight}><View style={{ flex: 1 }}></View></TouchableNativeFeedback>
                </View>
                    }

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    video: {
        width: ScreenWidth,
        height: ScreenWidth * 0.5625,
        // marginTop: StatusBar.currentHeight,
        backgroundColor: 'black',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
    },
    icon: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    sliderContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    timer: {
        // width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    }
})

export default VideoPlayer
