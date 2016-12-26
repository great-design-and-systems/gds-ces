import ApiServiceReducer from '../api/ApiServiceReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import AppListReducer from '../app-list/js/AppListReducer';
import AppModalReducer from '../app-modal/js/AppModalReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer,
    modal: AppModalReducer,
    list: AppListReducer
});

export default AppReducers;