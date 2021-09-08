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



    const removeFromFavorite = (id) => {
        LocalStorage.getObject('favorites').then((data) => {
            console.log(data);
            let newData = data.filter((item) => item.id !== id);
            LocalStorage.setObject('favorites', newData);
            ToastAndroid.show('Removed from Favorites', ToastAndroid.SHORT);
            setShowAddBtn(true);
        });
    }

    const addToFav = () => {
        addToFavorites(anime);
    }

    const removeFromFav = (func = console.log) => {
        removeFromFavorite(anime.id)
        setAnimeList(func)
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
    }, [anime.id])

    return {
        addToFav, removeFromFav,
        showAddBtn, setShowAddBtn,
        setAnimeList
    }
}

export default useFavorites
