export function save(action, model, params) {
    return {
        type: action,
        payload: { json: model, params: params }
    };
}

export function remove(action, params) {
    return {
        type: action,
        payload: { params: params }
    };
}

export function get(action, params) {
    return {
        type: action,
        payload: { params: params }
    };
}

export function query(action, query) {
    return {
        type: action,
        payload: query
    };
}

export function download(action, params) {
    return {
        type: action,
        payload: {
            params: params,
            query: {
                isFile: true
            }
        }
    }
}