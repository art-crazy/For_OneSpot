import axios from 'axios';
import axiosRetry from 'axios-retry';
import {isDebug, isDeviceAndroid, isDeviceIosLike,} from "./utils";
import {actionGetListSimilar,} from './store/actions';
import 'regenerator-runtime/runtime';

let BASE_URL = '';

const clientId = "";
const clientSecret = "";
const appBuild = 51;

let CONFIG_AXIOS = {
    headers: {
        'X-APP-PLATFORM': 'WEB',
        'X-DEV-PLATFORM': 'PC_WEB',
        'X-APP-BUILD': appBuild,
    }
};

if (isDeviceIosLike() === true) {
    CONFIG_AXIOS.headers['X-DEV-PLATFORM'] = 'IOS_WEB';
}

if (isDeviceAndroid() === true) {
    CONFIG_AXIOS.headers['X-DEV-PLATFORM'] = 'ANDROID_WEB';
}

function getErrorCodes() {
    return [200, 502, 901, 520, 424];
}

axiosRetry(axios, {
    retries: isDebug() ? 3 : 5,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return getErrorCodes().includes(error.response.status);
    },
});

function getDeviceConfig() {
    return CONFIG_AXIOS;
}

const getListSimilar = (EK_id, number, limit) => {
    return async (dispatch) => {
        const config = getDeviceConfig();
        config.headers['X-APP-ACCESS-TOKEN'] = window.localStorage.getItem('access_token');
        const url = BASE_URL + '/web/1/contents/' + EK_id + '/similar?page_number=' + number + '&limit=' + limit;
        try {
            const res = await axios.get(url, config)
            if (res.data.code === 901) {
                await postRefreshToken(window.localStorage.getItem('refresh_token'))
                // @ts-ignore
                return dispatch(getListSimilar(EK_id));
            }
            return dispatch(actionGetListSimilar(EK_id, res.data));
        } catch (err) {
            console.error(err)
        }
    };
}

export {
    authByDeviceUid,
    getRelease,
    getEkInfo,
    getRecBlocks,
    getSeasonEpisodes,
    getListSimilar,
    check,
    receiveSmsForRegistration,
    authApp,
    postRefreshToken,
    getReleaseChannel,
    getTvSchedule,
    getPackageByChannel,
    createPaymentWidget,
    getCardList,
    deleteCard,
    getEkPackages,
    searchHint,
    getPackageInfoById,
    unsubscribePackage,
    postRestorePackage,
    getRecBlocksChannels,
    setProfileUtm,
    getPaywalls,
    createPayment,
    checkPayment,
    getEkPackagesPromise,
    getPaywallsPromise,
    authYandex,
    appBuild
};
