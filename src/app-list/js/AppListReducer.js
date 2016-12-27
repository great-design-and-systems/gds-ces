const DEFAULT_STATE = {
    pending: false,
    error: null,
    start: 0,
    limit: 25,
    filter: null,
    order: null,
    field: null,
    params: null,
    dirty: false
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
        case 'SET_ORDER':
            state = { ...state };
            const order = state.order === 'desc' && state.field === action.payload.field ? null :
                state.order && state.field === action.payload.field ? 'desc' : 'asc';
            if (order != null) {
                state.order = order;
                state.field = action.payload.field;
            } else {
                state.order = null;
                state.field = null;
            }
            break;
        case 'TOGGLE_PENDING':
            state = { ...state };
            state.pending = !state.pending;
            break;
        case 'SET_PARAMS':
            state = { ...state };
            state.params = action.payload;
            state.dirty = true;
            break;
        case 'SET_DIRTY':
            state = { ...state };
            state.dirty = action.payload;
            break;
    }

    return state;
}

export default AppListReducer;