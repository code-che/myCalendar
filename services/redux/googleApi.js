const initialState = {
    gapi: {},
    isAuthenticated: false,
};
const googleApiReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'SET-GAPI':
            return {
                ...state,
                gapi: action.data.gapi,
            };
        case 'AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default googleApiReducer;