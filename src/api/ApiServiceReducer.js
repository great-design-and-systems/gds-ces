import lodash from 'lodash';
import {Api} from './ApiService';

const api = new Api();

const initialState = {
    pending: false,
    done: false,
    data: [],
    error: null
};

const ApiServiceReducer = (state = initialState, action) => {
    if (action.type.indexOf('_PENDING') > -1) {

    }
    else if (action.type.indexOf('_FULFILLED') > -1) {

    }
    else if (action.type.indexOf('_REJECTED') > -1) {

    }
    else if (/(.+)\.(.+)/.test(action.type)) {

    }
    return state;
};

export default ApiServiceReducer;