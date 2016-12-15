import { Api } from './ApiService';
import lodash from 'lodash';

const initialState = {
    pending: false,
    done: false,
    data: [],
    error: null
};



const ApiServiceReducer = (state = {}, action) => {
    let domainState;
    const api = new Api();
    state = {...state};
    if (action.payload && action.payload.domain) {
        const domain = action.payload.domain.replace(/\s/, '_');
        const executable = {...initialState };
        domainState = {};
        lodash.set(domainState, action.payload.executable, executable);
        lodash.set(state, domain, domainState);
    }
    if (domainState) {
        const executableState = lodash.get(domainState, action.payload.executable);
        if (executableState) {
            if (action.type.indexOf('_PENDING') > -1) {
                const newState = {...initialState, pending: true };
                lodash.set(domainState, action.payload.executable, newState);
            }
            else if (action.type.indexOf('_FULFILLED') > -1) {
                const newState = {...initialState, done: true,
                    data: action.payload.result
                };
                lodash.set(domainState, action.payload.executable, newState);
            }
            else if (action.type.indexOf('_REJECTED') > -1) {
                const newState = {...initialState, done: true,
                    error: action.payload
                };
                lodash.set(domainState, action.payload.executable, newState);
            }
        }

    }
    return state;
};

export default ApiServiceReducer;