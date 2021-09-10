import React, { useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { BackHandler } from 'react-native';

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
            if (fullScreen) {
                onFullScreen()
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
        setFullScreen(!fullScreen);
        setScrollLock(!scrollLock);
        if (fullScreen) {

            const orientation = ScreenOrientation.OrientationLock.PORTRAIT;
            ScreenOrientation.lockAsync(orientation);
            const s = SystemNavigationBar.navigationHide();
            console.log(s);
            // video.current.presentFullscreenPlayer();
        } else {
            const orientation = ScreenOrientation.OrientationLock.LANDSCAPE;
            // ScreenOrientation.unlockAsync();
            ScreenOrientation.lockAsync(orientation);
            let s = SystemNavigationBar.navigationShow();
            console.log(s);

            // video.current.dismissFullscreenPlayer();
        }
        console.log('FullScreen', fullScreen);
    }

    return ({
        fullScreen,
        setFullScreen,
        onFullScreen,
        backButtonHandle
    })
}

export default useFullscreen
