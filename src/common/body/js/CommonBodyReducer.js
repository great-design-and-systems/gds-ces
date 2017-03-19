const DEFAULT_STATE = {};

const CommonBodyReducer = (state = DEFAULT_STATE, action)=> {
    switch (action.type) {
        case 'SET_SCREEN_SIZE':
        {
            state = {...state, screen: action.payload};
            break;
        }
        case 'SET_BODY_HEIGHT':
        {
            state = {...state, height: action.payload};
            break;
        }
        case 'SET_BODY_WIDTH':
        {
            state = {...state, width: action.payload};
            break;
        }
    }
    return state;
};

export default CommonBodyReducer;