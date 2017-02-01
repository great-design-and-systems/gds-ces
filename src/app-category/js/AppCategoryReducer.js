const DEFAULT_STATE = {
    search: null,
    field: null,
    searchPending: false
}
const AppCategoryReducer = (state = DEFAULT_STATE, action) => {

    switch (action.type) {
        case 'SEARCH_CATEGORY_ITEMS':
            if (!state.searchPending) {
                state = { ...state, search: action.payload.search, field: action.payload.field, searchPending: true };
            }
            break;
        case 'SEARCH_CATEGORY_ITEMS_DONE':
            state = { ...state, searchPending: false };
            break;
    }

    return state;
}

export default AppCategoryReducer;