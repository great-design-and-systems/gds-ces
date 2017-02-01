export function searchItems(search, field) {
    return {
        type: 'SEARCH_CATEGORY_ITEMS',
        payload: {
            search: search,
            field: field
        }
    };
}

export function searchItemsDone() {
    return {
        type: 'SEARCH_CATEGORY_ITEMS_DONE'
    };
}