import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/auth';
import {moviesReducer} from './reducers/movies';
import {movieReducer} from './reducers/movie';
import {channelReducer} from './reducers/channel';
import {channelStreamReducer} from "./reducers/channelStream";
import {packageByChannelReducer} from "./reducers/packageByChannel";
import {packageReducer} from "./reducers/package";
import {cardReducer} from "./reducers/cards";
import {ekPackagesReducer} from "./reducers/ekPackages";
import {searchReducer} from "./reducers/search";
import {packageInfoReducer} from "./reducers/packageInfo";
import {channelsReducer} from "./reducers/channels";
import {paywallsReducer} from "./reducers/paywalls";

/**
 * Комбинириуем несколько reducers
 */
const rootReducer = combineReducers({
    auth: authReducer,
    movies: moviesReducer,
    movie: movieReducer,
    tv: channelReducer,
    channels: channelsReducer,
    channelStream: channelStreamReducer,
    packageByChannel: packageByChannelReducer,
    package: packageReducer,
    cards: cardReducer,
    ekPackages: ekPackagesReducer,
    search: searchReducer,
    packageInfo: packageInfoReducer,
    paywalls: paywallsReducer,
});

const storeRedux = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default storeRedux;
