import { Api } from './ApiService';
import lodash from 'lodash';

const api = new Api();

const initialState = {
    pending: false,
    done: false,
    data: [],
    error: null
};

const ApiServiceReducer = (state = {}, action) => {
    const domain;
    if (action.payload && action.payload.domain) {
        domain = action.payload.domain.replace(/\s/, '_');
    }
    if (action.type.indexOf('_PENDING') > -1) {
        state = {...state };
    }
    else if (action.type.indexOf('_FULFILLED') > -1) {

    }
    else if (action.type.indexOf('_REJECTED') > -1) {

    }
    return state;
};

export default ApiServiceReducer;