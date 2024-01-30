const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_MOVIES':
            return action.payload.response;
        default:
            return state;
    }
}

export {moviesReducer};
