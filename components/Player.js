import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Button, StatusBar, StyleSheet, View } from 'react-native'
import { API } from '../helpers/Const'
import { Video } from 'expo-av'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import VideoPlayer from 'expo-video-player'
import { Touchable } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Slider } from 'react-native-elements'
import { Text } from 'react-native'
import { Icon } from 'react-native-vector-icons'

let tempVIdeo = 'https://storage.googleapis.com/red-context-322613/W_EI1MPPPTRU/st22_kingdom-3rd-season-episode-1-HD.mp4'

const Player = ({ link }) => {

    const video = useRef(null)
    let overlay = true
    const [videoLinks, setVideoLinks] = useState({ hd: '', sd: '' })
    const [paused, setPaused] = useState(false)
    const [status, setStatus] = React.useState({});

    console.log(video.current);

    
    const playPause = () => {
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        setPaused(!paused)
    }

    const forward = () => {
        video.current
    }

    const onLoad = (status) => {
        setStatus(status)
    }

    const onProgress = (status) => {
        setStatus(status)
    }

    const onEnd = (status) => {
        setStatus(status)
    }

    const onError = (status) => {
        setStatus(status)
    }



    /** convert milliseconds to time */ 
    const getTime = (t) => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor(t / 60) % 60);
        const hour = digit(Math.floor(t / 3600) % 60);
        
        return `${hour}:${min}:${sec}`;
        // 33 => 00:00:33

    }

    // console.log(status);
    useEffect(() => {
        console.log("Link: ", link); 
        fetch(API.videoLink(link)).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            let videoLink = {
                hd: data.iframeUrl[0].url,
                sd: data.iframeUrl[1].url,
            }
            setVideoLinks(videoLink);
        })
        console.log('Player loaded')


    }, [])

    const onBuffer = (e) => {
        console.log('onBuffer', e)
    }

    const videoError = (e) => {
        console.log('videoError', e)
    }

    return (
        videoLinks?.hd.length ? <View>
            <Video
                ref={video}
                
                shouldPlay
                style={styles.video}
                source={{
                    // uri: videoLinks.hd,
                    uri: tempVIdeo,
                }}
                // useNativeControls
                resizeMode="contain"
                // isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.overlay}>
                {overlay ? <View style={{...styles.overlaySet, backgroundColor: '#0006'}}>
                    {/* <Icon name="backward" style={styles.icon} onPress={backward} />
                    <Icon name={paused ? 'play' : 'pause'} style={styles.icon}    onPress={playPause} />
                    <Icon name="forward" style={styles.icon}  onPress={forward} /> */}

                    <View style={styles.sliderContainer}>
                        
                        <View style={styles.timer}>
                            <Text style={styles.timerText}>{getTime(status.positionMillis)}</Text>
                            <Text style={styles.timerText}>{getTime(status.durationMillis)}</Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            value={status.positionMillis / status.durationMillis}
                            onValueChange={value => video.current.setPositionAsync(value * status.durationMillis)}
                            onSlidingComplete={value => video.current.setPositionAsync(value * status.durationMillis)}
                            thumbTintColor="#fff"
                            minimumTrackTintColor="#fff"
                            maximumTrackTintColor="#fff"
                            
                        />
                    </View>

                </View> : <View style={styles.overlaySet}>
                    <TouchableNativeFeedback onPress={youtubeSeekLeft}><View style={{flex : 1}}></View></TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={youtubeSeekRight}><View style={{flex : 1}}></View></TouchableNativeFeedback>
                </View>}

            </View>
        </View>
        : <ActivityIndicator size="large" />
    )
}

const styles = StyleSheet.create({
    video: {
        width: ScreenWidth ,
        height: ScreenWidth * 0.5625,
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
    },
        
})

function youtubeSeekLeft() {
    console.log('left');
    // video.current.seek(0);
}
function youtubeSeekRight() {
    console.log('right');
    // video.current.seek(video.current.getDuration());
}

function forward() {
    console.log('forward');
}

function backward() {
    console.log('backward');
}



export default Player
