import {BatchProcessor} from '../../../../common/AppUtils';
const DEFAULT_STATE = {};
const CardCatalogReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_MARC':
            state = {marc: action.payload};
            break;
    }
    return state;
};
export default CardCatalogReducer;