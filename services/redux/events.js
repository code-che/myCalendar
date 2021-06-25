const initialState = [];
const eventsReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'UPDATE-EVENTS':
            return [...action.data.events];
        case 'ADD-EVENT':
            return [...state,action.data.event];
        default:
            return state;
    }
};

export default eventsReducer;