const BASE_URL = 'https://an9where.vercel.app'



export const API = {
    popular: BASE_URL + '/api/v2/popular/1',

    search: (name) => BASE_URL + `/api/v2/search/${name}`,

    ongoing: BASE_URL + '/api/v2/ongoing',

    
    newSeasons: (page)=> BASE_URL + `/api/v2/newSeasons/${page}`,

    genre: (genre,page) => BASE_URL + `/api/v2/genre/${genre}/${page}` ,
    genreGet: (genre) => `https://kitsu.io/api/edge/anime?filter[categories]=${genre}`,

    movies: (page) =>BASE_URL + `/api/v2/movies/${page}`,

    animev2: (id) => BASE_URL + `/api/v2/anime/${id}`,
    animeMal: (id) => BASE_URL + `/api/animeMAL/${id}`,


    recent_eps: BASE_URL + `/api/v2/recentReleaseEpisodes/1`,
    recently_added_series: BASE_URL + `/api/v2/recentlyAddedSeries`,

    animeDetails: (id) => `https://kitsu.io/api/edge/anime?filter[text]=${id}`,
    episodeDetails: (id) => `https://kitsu.io/api/edge/anime?filter[text]=${id}`,
    episode: (anime, eps) => BASE_URL + `/api/video?ep=${anime}/episode/${eps}`,

    iframe: (anime, eps) => BASE_URL + `/api/iframe/${anime}/${eps}`,
    iframeDub: (anime, eps) => BASE_URL + `/api/iframe/${anime}-dub/${eps}`,
    getiframe: (anime, eps) => BASE_URL + `api/v2/animeEpisode/${anime}-${eps}`,
    getiframeDub: (anime, eps) => BASE_URL + `api/v2/animeEpisode/${anime}-dub-${eps}`,

    videoLink: (url) => BASE_URL + `/api/v2/getIFrameUrl?url=${url}`,
    // getEpsServer: (anime, eps) => `https://test2.simplyaweebgrou.repl.co/api/v1/AnimeEpisodeHandler/${anime}-${eps}`,
    // getAnime: (anime) => `https://test2.simplyaweebgrou.repl.co/api/v1/AnimeEpisodeHandler/${anime}`,
}

export const GENRE = [
    {name: 'Action', genre: 'action'}
    ,{name: 'Adventure', genre:'adventure'}
    ,{name: 'Comedy', genre:'comedy'}
    ,{name: 'Demons', genre:'demons'}
    ,{name: 'Drama', genre:'drama'}
    ,{name: 'Ecchi', genre:'ecchi'}
    ,{name: 'Fantasy', genre:'fantasy'}
    ,{name: 'Game', genre:'game'}
    ,{name: 'Harem', genre:'harem'}
    ,{name: 'Historical', genre:'historical'}
    ,{name: 'Horror', genre:'horror'}
    ,{name: 'Kids', genre:'kids'}
    ,{name: 'Magic', genre:'magic'}
    ,{name: 'Martial Arts', genre:'martial-arts'}
    ,{name: 'Mecha', genre:'mecha'}
    ,{name: 'Military', genre:'military'}
    ,{name: 'Music', genre:'music'}
    ,{name: 'Mystery', genre:'mystery'}
    ,{name: 'Parody', genre:'parody'}
    ,{name: 'Police', genre:'police'}
    ,{name: 'Psychological', genre:'psychological'}
    ,{name: 'Romance', genre:'romance'}
    ,{name: 'Samurai', genre:'samurai'}
    ,{name: 'School', genre:'school'}
    ,{name: 'Sci-Fi', genre: 'sci-fi'}
    ,{name: 'Seinen', genre:'seinen'}
    ,{name: 'Shoujo', genre:'shoujo'}
    ,{name: 'Shoujo Ai', genre:'shoujo-ai'}
    ,{name: 'Shounen', genre:'shounen'}
    ,{name: 'Shounen Ai', genre:'shounen-ai'}
    ,{name: 'Slice Of Life', genre:'slice-of-life'}
    ,{name: 'Space', genre:'space'}
    ,{name: 'Sports', genre:'sports'}
    ,{name: 'Super Power', genre:'super-power'}
    ,{name: 'Supernatural', genre:'supernatural'}
    ,{name: 'Thriller', genre:'thriller'}
    ,{name: 'Vampire', genre:'vampire'}
]