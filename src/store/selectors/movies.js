import _ from 'lodash';

const selectEpisodes = (movie) => {
    if (movie) {
        if (_.isArray(movie.episodes)) {
            if (movie.episodes.length > 0) {
                return movie.episodes;
            }
        }

        if (_.isArray(movie.seasons)) {
            if (movie.seasons[0].episodes) {
                return movie.seasons[0].episodes;
            }
        }
    }

    return [];
}

export {selectEpisodes};
