import { Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, StatusBar, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, View } from 'react-native'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import { API } from '../helpers/Const'
import Loading from '../components/Loading'
import { getFromApi } from '../helpers/hooks';
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { BottomSheet, ListItem } from 'react-native-elements'
import * as ScreenOrientation from 'expo-screen-orientation';

let qualities = ['HDP', 'SDP', '360P', '480P', '720P', '1080P']
const VideoPlayer = ({ link, videoQ }) => {

    const video = useRef(null)
    const [videoLinks, setVideoLinks] = useState(videoQ)
    const [fullScreen, setFullScreen] = useState(false);
    const [rate, setRate] = useState(1);
    const [optionVisible, setOptionVisible] = useState(false)
    const [src, setSrc] = useState('')
    const [paused, setPaused] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [status, setStatus] = React.useState({
        positionMillis: 0,
        durationMillis: 100,
    });
    let sliderValue = (status.positionMillis / status.durationMillis) || 0;
    const [loading, setLoading] = useState(false)



    // console.log(sliderValue , status.isBuffering);

    useEffect(() => {
        console.log("Link: ", link);
        // console.log("Video: ", videoQ);
        // setSrc(videoQ['HDP'])
        // console.log(videoQ['1080P']);
        setLoading(true)
        getFromApi(API.videoLink(link)).then((data) => {
            let videoLink = {
                hd: data.iframeUrl[0].url,
                sd: data.iframeUrl[1].url,
            }
            console.log(videoLink);
            setVideoLinks(videoLink);
            setSrc(videoLink.hd)
            setLoading(false)
        })
        console.log('Player loaded');
        StatusBar.setHidden(true);
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (fullScreen) {
                onFullScreen()
                return true;
            }
            return false;
        });

        return () => {
            // setLoading(true)
            console.log('Player unmounted');
            StatusBar.setHidden(false);
            backHandler.remove();
        }
    }, [link, videoQ])

    let lastTap = null;
    let timer = null;
    let overlayTimer = null;

    const handleDoubleTap = (doubleTapCallback, oneTapCallback) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            clearTimeout(timer);
            doubleTapCallback();
        } else {
            lastTap = now;
            timer = setTimeout(() => {
                oneTapCallback();
            }, DOUBLE_PRESS_DELAY);
        }
    }


    const onFullScreen = () => {
        setFullScreen(!fullScreen);
        if (fullScreen) {

            const orientation = fullScreen ? ScreenOrientation.OrientationLock.PORTRAIT : ScreenOrientation.OrientationLock.LANDSCAPE;
            ScreenOrientation.lockAsync(orientation);
            // video.current.presentFullscreenPlayer();
        } else {
            const orientation = fullScreen ? ScreenOrientation.OrientationLock.PORTRAIT : ScreenOrientation.OrientationLock.LANDSCAPE;
            // ScreenOrientation.unlockAsync();
            ScreenOrientation.lockAsync(orientation);

            // video.current.dismissFullscreenPlayer();
        }
        // logEvent('Player', 'FullScreen', 'FullScreen');
        console.log('FullScreen', fullScreen);
    }

    const onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
        console.log(fullscreenUpdate, status)
        switch (fullscreenUpdate) {
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
                console.log(' the fullscreen player is about to present')
                break
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                console.log('the fullscreen player just finished presenting')
                break
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                console.log('the fullscreen player is about to dismiss')
                break
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
                console.log('the fullscreen player just finished dismissing')
        }
    }


    const playPause = () => {
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        setPaused(!paused)
    }

    const seekBackward = (value = 10000) => {
        let pos = status.positionMillis - value;
        video.current.playFromPositionAsync(pos)
        console.log('seekbackward', pos);
        clearTimeout(overlayTimer)
        overlayTimer = setTimeout(() => {
            setOverlay(false)
        }, 3000)
    }
    const seekForward = (value = 10000) => {
        let pos = status.positionMillis + value
        video.current.playFromPositionAsync(pos)
        console.log('seekForward', pos);
        clearTimeout(overlayTimer)
        overlayTimer = setTimeout(() => {
            setOverlay(false)
        }, 3000)
    }

    const youtubeSeekLeft = (value = 5000) => {
        const doubleTap = () => {
            let pos = status.positionMillis - value;
            video.current.playFromPositionAsync(pos)
        }
        const singleTap = () => {
            setOverlay(true)
            console.log('single tap LEFT');
            overlayTimer = setTimeout(() => {
                setOverlay(false)
            }, 3000)
        }

        handleDoubleTap(doubleTap, singleTap)
    }

    const youtubeSeekRight = (value = 5000) => {
        const doubleTap = () => {
            let pos = status.positionMillis + value;
            console.log(pos);
            video.current.playFromPositionAsync(pos)
            console.log('double tap RIGHT');

        }
        const singleTap = () => {
            setOverlay(true)
            console.log('single tap RIGHT');
            overlayTimer = setTimeout(() => {
                setOverlay(false)
            }, 3000)
        }

        handleDoubleTap(doubleTap, singleTap)
    }

    const onSlide = (slide) => {
        let pos = slide * status.durationMillis;
        console.log('onslide', slide, pos);
        video.current.playFromPositionAsync(pos)
        clearTimeout(overlayTimer)
        overlayTimer = setTimeout(() => {
            setOverlay(false)
        }, 3000)
    }

    const handleOption = (e) => {
        // console.log(e);
        setOptionVisible(!optionVisible)
    }


    return (
        <View style={fullScreen ? styles.fullScreenVideo : styles.video }>
            {loading ? <Loading /> :
                <Video
                    ref={video}
                    style={{ ...StyleSheet.absoluteFillObject}}
                    source={{
                        uri: src,
                    }}
            
                    rate={rate}
                    onFullscreenUpdate={onFullscreenUpdate}
                    resizeMode="contain"
                    shouldPlay={true}
                    progressUpdateIntervalMillis={1000}
                    onLoad={(status) => { setStatus(status) }}
                    onPlaybackStatusUpdate={status => setStatus(() => status)}

                />}

            <View style={styles.overlay}>
                {overlay ? <View style={{ ...styles.overlaySet, backgroundColor: '#0006' }}>
                    <Ionicons name="play-back-sharp" style={styles.icon} onPress={() => seekBackward()} />
                    <Ionicons name={paused ? 'play' : 'pause'} style={styles.icon} onPress={playPause} />
                    <Ionicons name="play-forward-sharp" style={styles.icon} onPress={() => seekForward()} />

                    <View style={styles.sliderContainer}>
                        <View style={styles.timer}>
                            <Text style={{ color: 'white' }} >{getTimeFromMillis(status.positionMillis)}</Text>
                            <Text style={{ color: 'white' }}>{getTimeFromMillis(status.durationMillis)}
                                <Ionicons name={fullScreen ? 'contract' : 'expand'} onPress={onFullScreen} style={{ color: 'white', fontSize: 20,padding  : 10 }} />
                            </Text>
                        </View>
                        <Slider
                            maximumTrackTintColor='white'
                            minimumTrackTintColor='white'
                            thumbTintColor='white'
                            value={sliderValue}
                            onValueChange={onSlide}
                        />
                    </View>

                    <View style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Ionicons name='ellipsis-vertical' style={{ color: 'white', fontSize: 25, padding: 5 }} onPress={handleOption} />
                        </View>


                    </View>
                </View> :
                    <View style={styles.overlaySet}>
                        <TouchableNativeFeedback onPress={() => youtubeSeekLeft()}><View style={{ flex: 1 }}></View></TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => youtubeSeekRight()}><View style={{ flex: 1 }}></View></TouchableNativeFeedback>
                    </View>
                }
                {/* <BottomSheet
                    isVisible={optionVisible}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                    
                >
                    <TouchableWithoutFeedback onPress={(e) => {
                        setOptionVisible(false)
                    }}> 


                        <ListItem containerStyle={styles.list} bottomDivider >
                            <Ionicons name='speedometer' style={{}} />
                            <ListItem.Content>
                                <ListItem.Title style={styles.ListItem}>Rate : {status.rate}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableWithoutFeedback>

                </BottomSheet> */}

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

    fullScreenVideo: {
        width: ScreenHeight,
        height: ScreenWidth,
        // // marginTop: StatusBar.currentHeight,
        backgroundColor: 'black',
        // ...StyleSheet.absoluteFill,
        elevation: 10,
        
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
    },
    icon: {
        color: '#fff',
        // flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        // backgroundColor: 'red',
        // margin: 50,

    },
    sliderContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    optionContainer: {
        position: 'absolute',
        top: 0,
        right: 0,

    },
    timer: {
        // width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    }
})

/** convert milliseconds to time */
const getTimeFromMillis = (t) => {
    // console.log(t);
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    const sec = digit(Math.floor(t / 1000) % 60);
    const min = digit(Math.floor(t / 60000) % 60);
    const hour = digit(Math.floor(t / 3600000) % 60);

    return `${hour}:${min}:${sec}`;
    // 33 => 00:00:33
}

export default VideoPlayer
