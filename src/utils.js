const emailLink = "mailto:team@bolshoe.tv?body=Письмо отправлено с bolshoe.tv/promo/web/. Profile ID: "
    + localStorage.getItem("profile_id") + "&subject=Большое ТВ / web.";

export {
    goal,
    isDebug,
    debug,
    formatTime,
    getCampaignId,
    getLastEP,
    getDeviceUid,
    getSegmentName,
    getGroup,
    getPackageId,
    getPackageOnly,
    getUtmCampaign,
    getUtmMedium,
    getGroupName,
    getUrlParams,
    isMobileDevice,
    isDeviceMacLike,
    isBrowserChrome,
    isBrowserFirefox,
    isDeviceIOS,
    isDeviceAndroid,
    isDeviceMacOS,
    isDeviceIosLike,
    emailLink
};
