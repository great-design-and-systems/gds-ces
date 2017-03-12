const DEFAULT_STATE = {
    basic: null,
    additional: null,
    copies: null
};

const ManualEntryReducer = (state = DEFAULT_STATE, action)=> {
    switch (action.type) {
        case 'SET_BASIC_MODEL':
            state = {...state, basic: action.payload};
            break;
        case 'SET_ADDITIONAL_MODEL':
            state = {...state, additional: action.payload};
            break;
        case 'SET_COPIES_MODEL':
            state = {...state, copies: action.payload};
            break;
    }
    return state;
};

export default ManualEntryReducer;