import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { BottomSheet, Icon, ListItem } from 'react-native-elements'

let qualities = ['HD', 'SD']
let rateList = [1.0, 1.25, 1.5, 1.75, 2.0, 2.1, 2.2, 2.3, 2.5]

const VideoOptions = ({ video, visible, toggle }) => {

    const [rateOptionToggle, setRateOptionToggle] = React.useState(false)
    const [qualityOptionToggle, setQualityOptionToggle] = React.useState(false)

    const [rate, setRate] = React.useState(video.state.rate)
    const [quality, setQuality] = React.useState('SD')

    // console.log(qualityOptionToggle + 'q  r ' + rateOptionToggle)

    // console.log(video.status);

    const toggleRateOption = () => {
        setRateOptionToggle(!rateOptionToggle)
    }

    const toggleQualityOption = () => {
        setQualityOptionToggle(!qualityOptionToggle)
    }

    const RateOption = () => (
        <BottomSheet
            isVisible={rateOptionToggle}
            modalProps={{
                onRequestClose: toggleRateOption,
            }}
            containerStyle={{ backgroundColor: '#0009' }}
        >
            {rateList.map((item, index) => (
                <ListItem bottomDivider key={index} onPress={() => {
                    video.ref.setRateAsync(item, true)
                    toggleRateOption()
                    // toggle()
                    setRate(rate)
                }}>
                    <Ionicons name="ios-speedometer" size={30} color="white" />

                    <ListItem.Content>
                        <ListItem.Title>{item}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
            <Cancel toggleFn={toggleRateOption} />
        </BottomSheet>
    )

    const QualityOption = () => (
        <BottomSheet
            isVisible={qualityOptionToggle}
            containerStyle={{ backgroundColor: '#0009' }}
            modalProps={{
                onRequestClose: toggleQualityOption,
            }}
        >
            {qualities.map((item, index) => (
                <ListItem bottomDivider key={index} onPress={() => {
                    // video.setQualityAsync(item, true)
                    let url = video.videoLinks[item]
                    console.log(url);
                    video.setSrc(url)
                    toggleQualityOption()
                    // console.log(item);
                    setQuality(item)
                }}>
                    <Ionicons name="md-film" size={30} color="white" />

                    <ListItem.Content>
                        <ListItem.Title>{item}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
            <Cancel toggleFn={toggleQualityOption} />
        </BottomSheet>
    )


    const Cancel = ({toggleFn}) => (
        <ListItem bottomDivider
            containerStyle={{ backgroundColor: "red" }}
            onPress={() => {
                toggleFn()
            }}>
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white' }}>Cancel</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )


    return (
        <>
            <BottomSheet
                isVisible={visible}
                modalProps={{
                    onRequestClose: toggle,
                }}
                containerStyle={{ backgroundColor: '#0009' }}
            >
                <ListItem bottomDivider onPress={() => {
                    setRateOptionToggle(true)
                    // toggle()
                }}>
                    <Ionicons name="ios-speedometer" size={30} color="white" />
                    <ListItem.Content>
                        <ListItem.Title>Rate : { rate }</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider onPress={() => {
                    setQualityOptionToggle(true)
                    // toggle()
                }}>
                    <Ionicons name="ios-film" size={30} color="white" />
                    <ListItem.Content>
                        <ListItem.Title>Quality : { quality }</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <Cancel toggleFn={toggle} />
            </BottomSheet>

            {RateOption()}
            {/* <QualityOption /> */}
            {QualityOption()}

        </>

    )
}



export default VideoOptions
