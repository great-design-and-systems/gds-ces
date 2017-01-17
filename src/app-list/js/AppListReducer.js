import lodash from 'lodash';

const FLOATING_STATE = {};
const DEFAULT_STATE = {
    pending: false,
    error: null,
    start: 0,
    limit: 25,
    filter: null,
    order: null,
    params: null,
    dirty: false,
    total: null,
    target: null,
    page: 0,
    field: null
}
const AppListReducer = (rootState = {}, action) => {
    rootState = {...rootState };
    const target = rootState.target;
    let state = getState(target);
    switch (action.type) {
        case 'SET_START':
            state.start = action.payload;
            break;
        case 'SET_LIMIT':
            state.limit = action.payload;
            state.start = 0;
            break;
        case 'SET_FILTER':
            state.filter = action.payload.filter;
            state.field = action.payload.field;
            break;
        case 'SET_ORDER':
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
            state.pending = !state.pending;
            break;
        case 'SET_PARAMS':
            state.params = action.payload;
            break;
        case 'SET_DIRTY':
            state.dirty = action.payload;
            break;
        case 'SET_TOTAL':
            state.total = action.payload;
            break;
        case 'SET_PENDING':
            state.pending = action.payload;
            break;
        case 'SET_TARGET':
            rootState.target = action.payload;
            break;
        case 'SET_PAGE':
            state.page = action.payload;
            break;
        case 'CLEAR_LIST':
            lodash.unset(FLOATING_STATE, action.payload);
            break;
    }
    if (target) {
        setState(target, state);
    }
    rootState.getState = (target) => {
        return getState(target);
    }
    return rootState;
}

function getState(field) {
    if (field) {
        let state = lodash.get(FLOATING_STATE, field);
        if (!state) {
            state = { ...DEFAULT_STATE };
        }
        return state;
    }
    return null;
}

function setState(field, state) {
    lodash.set(FLOATING_STATE, field, state);
}
export default AppListReducer;