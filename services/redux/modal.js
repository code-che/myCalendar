const initialState = {
    show: false,
};
const modalReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'SHOW-MODAL':
            return { show: true };
        default:
            return state;
    }
};

export default modalReducer;