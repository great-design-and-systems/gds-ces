import ApiServiceReducer from '../api/ApiServiceReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer
});

export default AppReducers;