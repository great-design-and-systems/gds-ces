import ApiServiceReducer from '../api/ApiServiceReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer
});

export default AppReducers;