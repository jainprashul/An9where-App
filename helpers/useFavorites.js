import { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import LocalStorage from './LocalStorage';
// import { createToast } from './hooks';
// import firebase from './firebase'
// import { useCurrentUser } from '../components/CurrentUser';

const useFavorites = (Anime) => {
    // console.log(Anime);

    const [showAddBtn, setShowAddBtn] = useState(true);

    // const { user, loading, error } = useCurrentUser();

    const addToFavorites = ({ img, title, id }) => {
        LocalStorage.getObject('favorites').then((data) => {
            console.log(data);
            let anime = { img, title, id };
            let watchList = [...data, anime];
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
        let { img, title, id } = Anime;
        addToFavorites({ img, title, id });
    }

    const removeFromFav = (func = console.log) => {
        removeFromFavorite(Anime.id)
        setAnimeList(func)
    }

    const setAnimeList = (setfunc) => {
        LocalStorage.getObject('favorites').then((data) => {
            setfunc(data);
        });
    }


    useEffect(() => {
        LocalStorage.getObject('favorites').then((data) => {
            let isFav = data.find((item) => item.id === Anime.id);
            if (isFav) {
                setShowAddBtn(false);
            }
        });
    }, [Anime.id])

    return {
        addToFav, removeFromFav,
        showAddBtn, setShowAddBtn,
        setAnimeList
    }
}

export default useFavorites
