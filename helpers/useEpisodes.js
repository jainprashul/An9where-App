const useEpisodes = () => {

    
    const getEpisodes = () => {
        const query = [
            fetch(API.iframe(id, `episode-${episodeNo}`)),
            fetch(API.iframeDub(id, `episode-${episodeNo}`))
        ]

        Promise.all(query).then((responses) => (
            // Get a JSON object from each of the responses
            Promise.all(responses.map((response) => (response.json()))))).then((data) => {
                let sub = data[0]
                let dub = data[1]
                // console.log(sub, dub);
                if (!sub.servers?.length) setError(() => (<View style={styles.errorBox} >
                    <Text style={styles.errorTitle} >Error 404</Text>
                    <Text>The Requested page does not exist</Text>
                </View>));

                let videoLinks = {
                    sub: sub.servers[1] ? sub.servers[1]["iframe"] : null,
                    dub: dub.servers[1] ? dub.servers[1]['iframe'] : null,
                }
                setVideoLink(videoLinks)
                let vLink = dub.servers[1] ? dub.servers[1]['iframe'] : (sub.servers[1] ? sub.servers[1]["iframe"] : null)
                setLink(vLink)
                savingEpisode();
            }).catch((error) => {
                console.error("Error : ", error);
            });
    }

    // console.log(playedEpisodes);
    const savingEpisode = (player) => {
        playedEpisodes.includes(episodeNo) ? null : playedEpisodes.push(episodeNo);
        let state = {
            currentPlaying: episodeNo,
            name: title,
            img,
            id,
            totalEpisodes,
            playedEpisodes
        }

        if (player) {
            state = {
                currentPlaying: episodeNo,
                name: title,
                img,
                id,
                totalEpisodes,
                playedEpisodes,
                currentTime: player.currentTime,
                progress: (player.currentTime / player.duration) * 100,
            }
        }

        LocalStorage.getObject('watching').then((data) => {
            // let watchList = data ? data : {};
            let watchList = {};
            watchList[id] = state;
            LocalStorage.setObject('watching', watchList);
        })
        !player && console.log('Saving', state);
    }
}


export default useEpisodes;
