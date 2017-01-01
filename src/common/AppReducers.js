import ApiServiceReducer from '../api/ApiServiceReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import AppListReducer from '../app-list/js/AppListReducer';
import AppModalReducer from '../app-modal/js/AppModalReducer';
import CommonViewReducer from '../common-view/js/CommonViewReducer';
import HeaderFormReducer from '../header-form/js/HeaderFormReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer,
    modal: AppModalReducer,
    list: AppListReducer,
    view: CommonViewReducer,
    headerForm: HeaderFormReducer
});

export default AppReducers;