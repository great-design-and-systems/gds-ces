export function togglePending(target) {
    return {
        type: 'TOGGLE_PENDING',
        payload: target
    };
}

export function sort(field, target) {
    return {
        type: 'SET_ORDER',
        payload: {
            field: field,
            target: target
        }
    }
}

export function setParams(params, target) {
    return {
        type: 'SET_PARAMS',
        payload: {
            params: params,
            target: target
        }
    };
}

export function setDirty(dirty, target) {
    return {
        type: 'SET_DIRTY',
        payload: {
            dirty: dirty,
            target: target
        }
    };
}

export function setLimit(limit, target) {
    return {
        type: 'SET_LIMIT',
        payload: {
            limit: limit,
            target: target
        }
    };
}

export function setFilter(field, filter, target) {
    return {
        type: 'SET_FILTER',
        payload: {
            field: field,
            filter: filter,
            target: target
        }
    };
}

export function setTotal(total, target) {
    return {
        type: 'SET_TOTAL',
        payload: {
            total: total,
            target: target
        }
    }
}

export function setPending(pending, target) {
    return {
        type: 'SET_PENDING',
        payload: {
            pending: pending,
            target: target
        }
    };
}

export function setStart(start, target) {
    return {
        type: 'SET_START',
        payload: {
            start: start,
            target: target
        }
    }
}

export function setPage(page, target) {
    return {
        type: 'SET_PAGE',
        payload: {
            page: page,
            target: target
        }
    }
}

export function clearList(listId) {
    return {
        type: 'CLEAR_LIST',
        payload: listId
    }
}

export function setJson(json, target) {
    return {
        type: 'SET_JSON',
        payload: {
            json: json,
            target: target
        }
    };
}