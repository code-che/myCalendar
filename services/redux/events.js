const initialState = [];
const eventsReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'UPDATE-EVENTS':
            return [...action.data.events];
        default:
            return state;
    }
};

export default eventsReducer;