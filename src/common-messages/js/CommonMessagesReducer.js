const DEFAULT_STATE = {
    errors: []
}

const CommonMessagesReducer = (state = {}, action)=> {

    switch(action.type) {
        case 'ADD_ERROR':
            state = {...state};
            state.errors.push(action.payload);
        break;
        case 'CLEAR_ERRORS':
            state = {...state};
            state.errors = [];
        break;
        case 'SET_ERRORS':
            state = {...state};
            state.errors = action.payload ? action.payload : [];
        break;
    }

    return state;
}

export default CommonMessagesReducer;