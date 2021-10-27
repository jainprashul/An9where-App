import { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import LocalStorage from './LocalStorage';
// import { createToast } from './hooks';
// import firebase from './firebase'
// import { useCurrentUser } from '../components/CurrentUser';

const useFavorites = (anime) => {
    // console.log(Anime);

    const [showAddBtn, setShowAddBtn] = useState(true);

    // const { user, loading, error } = useCurrentUser();

    const addToFavorites = (anime) => {
        LocalStorage.getObject('favorites').then((res) => {
            console.log(res);
            let data = res ? res : [];
            let watchList = [...data, anime];

            console.log('watchList', watchList);
            LocalStorage.setObject('favorites', watchList);
            ToastAndroid.show('Added to Favorites', ToastAndroid.SHORT);
            setShowAddBtn(false);
        });
    }


    const addToFav = () => {
        addToFavorites(anime);
    }

    /**
     * remove from favorites
     * @param {Function} setFn - set function to update state of favorites list
     */
    const removeFromFav = (setFn = console.log) => {   
        LocalStorage.getObject('favorites').then((data) => {
            console.log(data);
            let newData = data.filter((item) => item.id !== anime.id);
            LocalStorage.setObject('favorites', newData);
            setFn(newData);
            ToastAndroid.show(`Removed from Favorites : ${anime.title}`, ToastAndroid.SHORT);
            setShowAddBtn(true);
        });
    }

    const setAnimeList = (setfunc) => {
        LocalStorage.getObject('favorites').then((data) => {
            setfunc(data);
        });
    }


    useEffect(() => {
        LocalStorage.getObject('favorites').then((data) => {
            if (data) {
            let isFav = data.find((item) => item.id === anime.id);
            if (isFav) {
                setShowAddBtn(false);
                }
            }
        });



        return () => {
            // cleanup
        }
        
    }, [anime.id])

    return {
        addToFav, removeFromFav,
        showAddBtn, setShowAddBtn,
        setAnimeList
    }
}

export default useFavorites
