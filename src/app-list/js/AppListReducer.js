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
    rootState = { ...rootState };
    if (action && action.payload) {
        rootState.target = action.payload.target;
        let state = getState(action.payload.target);
        switch (action.type) {
            case 'SET_START':
                state = {...state };
                state.start = action.payload.start;
                break;
            case 'SET_LIMIT':
                state = {...state };
                state.limit = action.payload.limit;
                state.start = 0;
                break;
            case 'SET_FILTER':
                state = {...state };
                state.filter = action.payload.filter;
                state.field = action.payload.field;
                break;
            case 'SET_ORDER':
                state = {...state };
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
                state = {...state };
                state.pending = !state.pending;
                break;
            case 'SET_PARAMS':
                state = {...state };
                state.params = action.payload.params;
                break;
            case 'SET_DIRTY':
                state = {...state };
                state.dirty = action.payload.dirty;
                break;
            case 'SET_TOTAL':
                state = {...state };
                state.total = action.payload.total;
                break;
            case 'SET_PENDING':
                state = {...state };
                state.pending = action.payload.pending;
                break;
            case 'SET_PAGE':
                state = {...state };
                state.page = action.payload.page;
                break;
            case 'CLEAR_LIST':
                state = {...state };
                lodash.unset(FLOATING_STATE, action.payload);
                break;
        }

        if (action.payload.target) {
            setState(action.payload.target, state);
        }
        rootState.getState = (target) => {
            return getState(target);
        }
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