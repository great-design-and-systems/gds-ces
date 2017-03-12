import {BatchProcessor} from '../../../../common/AppUtils';
const DEFAULT_STATE = {
    search: null,
    source: null,
    searchPending: false,
    batchProcessor: new BatchProcessor()
};
const OnlineSearchReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SEARCH_ONLINE':
            state = {...state, search: action.payload.search};
            break;
        case 'CHANGE_ONLINE_SOURCE':
            state = {...state, source: action.payload.source};
            break;
    }
    return state;
};
export default OnlineSearchReducer;