const DEFAULT_STATE = {
    pending: false,
    error: null,
    start: 0,
    limit: 25,
    filter: null,
    order: null,
    field: null,
    params: null,
    dirty: false,
    total: null,
    target: null,
    page: 1
}

const AppListReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_START':
            state = { ...state };
            state.start = action.payload;
            break;
        case 'SET_LIMIT':
            state = { ...state };
            state.limit = action.payload;
            state.start = 0;
            break;
        case 'SET_FILTER':
            state = { ...state };
            state.filter = action.payload.filter;
            state.field = action.payload.field;
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
            break;
        case 'SET_DIRTY':
            state = { ...state };
            state.dirty = action.payload;
            break;
        case 'SET_TOTAL':
            state = { ...state };
            state.total = action.payload;
            state.start = 0;
            break;
        case 'SET_PENDING':
            state = { ...state };
            state.pending = action.payload;
            break;
        case 'SET_TARGET':
            state = { ...state };
            state.target = action.payload;
            break;
        case 'SET_PAGE':
            state = { ...state };
            state.page = action.payload;
            break;
    }

    return state;
}

export default AppListReducer;