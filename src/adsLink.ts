import {debug, getDeviceUid, goal, isMobileDevice} from "./utils";

export function openStore(contentId: string, epId: string, os: string) {

    goal('appstore');

    let adsLink: string | URL;

    if (os) {
        if (os === "ios") {
            adsLink = 'https://trk.mail.ru/c/?' + 'device_uid=' + getDeviceUid() + getUrlParams();
        } else if (os === "android") {
            adsLink = 'https://trk.mail.ru/c/?' + 'device_uid=' + getDeviceUid() + getUrlParams();
        }
    } else if (!os) {
        adsLink = 'https://trk.mail.ru/c/?' + 'device_uid=' + getDeviceUid() + getUrlParams();
    }


    if (contentId) {
        adsLink += '&content_id=' + contentId;
        if (epId) {
            adsLink += '&episode_id=' + epId;
        }
    }

    debug('LINK INSTALL BUTTON: ' + adsLink);

    if (isMobileDevice()) {
        if (typeof adsLink === "string") {
            location.href = adsLink;
        }
    } else {
        window.open(adsLink, "_blank").focus();
    }

}
