const actionGetListSimilar = (data) => ({
    type: 'FETCH_SIMILAR',
    payload: {
        ...data
    }
});

export {
    actionAuthDevice,
    actionGetRecBlocks,
    actionGetEkInfo,
    actionGetSeasonEpisodes,
    actionGetRelease,
    actionGetListSimilar,
    actionGetTvScheduleFailure,
    actionGetTvScheduleSuccess,
    actionGetTvScheduleRequest,
    actionGetReleaseChannelRequest,
    actionGetReleaseChannelChannel,
    actionGetReleaseChannelFailure,
    actionGetPackageByChannelSuccess,
    actionCreatePaymentWidget,
    actionGetCardList,
    actionGetEkPackages,
    actionSearchQuery,
    actionGetPackageInfoById,
    actionGetRecBlocksChannels,
    actionGetPaywalls,
};
