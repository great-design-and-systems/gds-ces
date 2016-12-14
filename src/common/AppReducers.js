import {combineReducers} from 'redux';
import ApiServiceReducer from '../api/ApiServiceReducer';

const AppReducers = combineReducers({
    api: ApiServiceReducer
}, promise(), thunk);

export default AppReducers;