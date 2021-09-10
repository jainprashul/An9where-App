import React, { useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { BackHandler } from 'react-native';

let fullScreenStat = false // this is a global variable that will be used to check if the screen is in fullscreen mode

/**
 *  useFullscreen - useFullscreen() is a react hook that will set the screen orientation to landscape and lock the screen orientation. 
 *  This is useful for fullscreen apps.
 * @param {{ scrollLock: boolean, setScrollLock: function }} scroll 
 */
const useFullscreen = (scroll) => {

    const [fullScreen, setFullScreen] = useState(false);
    const { scrollLock, setScrollLock } = scroll;

    const backButtonHandle = () => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // console.log('back button pressed', fullScreen, fukk); 
            if (fullScreenStat) {
                // console.log('back button pressed on full');
                fullScreenStat = fullScreen
                const orientation = ScreenOrientation.OrientationLock.PORTRAIT;
                ScreenOrientation.lockAsync(orientation);
            setFullScreen(false);
                return true;
            }
            return false;
        });

        return backHandler
    }


    /**
     * onFullScreen() is a function that will check the screen orientation and lock the screen orientation.
     * @description: Interface to set fullscreen mode
     * @returns {void}
     */
    const onFullScreen = () => {
        // console.log('FullScreen before', fullScreen);
        let full = !fullScreen;
        fullScreenStat = full;
        if (full) {
            const orientation = ScreenOrientation.OrientationLock.LANDSCAPE;
            ScreenOrientation.lockAsync(orientation);
            const s = SystemNavigationBar.navigationHide();
            // video.current.presentFullscreenPlayer();
        } else {
            const orientation = ScreenOrientation.OrientationLock.PORTRAIT;
            ScreenOrientation.lockAsync(orientation);
            let s = SystemNavigationBar.navigationShow();
            // video.current.dismissFullscreenPlayer();
        }
        // console.log('FullScreen after', full);
        setScrollLock(!scrollLock);
        setFullScreen(full);
    }

    return ({
        fullScreen,
        setFullScreen,
        onFullScreen,
        backButtonHandle
    })
}

export default useFullscreen
