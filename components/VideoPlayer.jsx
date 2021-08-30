import { Video } from 'expo-av'
import React from 'react'
import { View } from 'react-native'


let tempVIdeo = 'https://storage.googleapis.com/red-context-322613/W_EI1MPPPTRU/st22_kingdom-3rd-season-episode-1-HD.mp4'


const VideoPlayer = ({ link }) => {

    const video = useRef(null)
    let overlay = true
    const [videoLinks, setVideoLinks] = useState({ hd: '', sd: '' })
    const [paused, setPaused] = useState(false)
    const [status, setStatus] = React.useState({});

    const playPause = () => {
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        setPaused(!paused)
    }


    return (
        <View>
            {/* <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: tempVIdeo,
                }}
                resizeMode="contain"
                // shouldPlay
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            /> */}
        </View>
    )
}

export default VideoPlayer
