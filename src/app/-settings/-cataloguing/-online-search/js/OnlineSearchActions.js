export function searchOnline(search) {
    return {
        type: 'SEARCH_ONLINE',
        payload: {
            search: search
        }
    };
}

export function changeSource(source) {
    return {
        type: 'CHANGE_ONLINE_SOURCE',
        payload: {
            source: source
        }
    };
}

export function searchOnlineDone() {
    return {
        type: 'SEARCH_ONLINE_DONE'
    };
}