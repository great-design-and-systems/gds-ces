import ApiServiceReducer from '../api/ApiServiceReducer';
import AppCategoryReducer from '../app-category/js/AppCategoryReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import AppListReducer from '../app-list/js/AppListReducer';
import AppModalReducer from '../app-modal/js/AppModalReducer';
import CommonMessagesReducers from '../common-messages/js/CommonMessagesReducer';
import CommonViewReducer from '../common-view/js/CommonViewReducer';
import FormFieldReducer from '../form-fields/js/FormFieldReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer,
    modal: AppModalReducer,
    list: AppListReducer,
    view: CommonViewReducer,
    messages: CommonMessagesReducers,
    field: FormFieldReducer,
    appCategory: AppCategoryReducer
});

export default AppReducers;