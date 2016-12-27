export function togglePending() {
    return {
        type: 'TOGGLE_PENDING'
    };
}

export function sort(field) {
    return {
        type: 'SET_ORDER',
        payload: {
            field: field
        }
    }
}

export function setParams(params) {
    return {
        type: 'SET_PARAMS',
        payload: params
    };
}

export function setDirty(dirty) {
    return {
        type: 'SET_DIRTY',
        payload: dirty
    };
}