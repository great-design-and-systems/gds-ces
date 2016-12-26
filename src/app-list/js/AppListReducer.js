const DEFAULT_STATE = {
    pending: false,
    error: null,
    start: 0,
    limit: 25,
    filter: null,
    order: null,
}

const AppListReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_FIRST':
            state = { ...state };
            state.start = action.payload;
            break;
        case 'SET_LIMIT':
            state = { ...state };
            state.limit = action.payload;
            break;
        case 'SET_FILTER':
            state = { ...state };
            state.filter = action.payload;
            break;
        case 'SET_ORDER': {
            state = { ...state };
            state.order = {
                field: action.payload.field,
                order: action.payload.order
            };
        }
    }

    return state;
}