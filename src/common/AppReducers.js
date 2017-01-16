import ApiServiceReducer from '../api/ApiServiceReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import AppListReducer from '../app-list/js/AppListReducer';
import AppModalReducer from '../app-modal/js/AppModalReducer';
import CommonMessagesReducers from '../common-messages/js/CommonMessagesReducer';
import CommonViewReducer from '../common-view/js/CommonViewReducer';
import FormFieldReducer from '../form-fields/js/FormFieldReducer';
import HeaderFormReducer from '../header-form/js/HeaderFormReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer,
    modal: AppModalReducer,
    list: AppListReducer,
    view: CommonViewReducer,
    headerForm: HeaderFormReducer,
    messages: CommonMessagesReducers,
    field: FormFieldReducer
});

export default AppReducers;