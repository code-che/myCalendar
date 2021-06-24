const initialState = {
    isOpen: false,
};
const modalReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'SHOW-MODAL':
            return { isOpen: true };
        case 'CLOSE-MODAL':
            return { isOpen: false};
        default:
            return state;
    }
};

export default modalReducer;