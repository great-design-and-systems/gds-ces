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

export function setLimit(limit) {
    return {
        type: 'SET_LIMIT',
        payload: limit
    };
}

export function setFilter(field, filter) {
    return {
        type: 'SET_FILTER',
        payload: {
            field: field,
            filter: filter
        }
    }
}

export function setTotal(total) {
    return {
        type: 'SET_TOTAL',
        payload: total
    }
}