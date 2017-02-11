import ApiServiceReducer from '../api/ApiServiceReducer';
import AppFormReducer from '../app-form/js/AppFormReducer';
import AppModalReducer from '../app-modal/js/AppModalReducer';
import { CategoryReducer } from '../app/js/AppReducers';
import CommonAsyncListReducer from './async-list/js/CommonAsyncListReducer';
import CommonMessagesReducers from './messages/js/CommonMessagesReducer';
import CommonViewReducer from './view/js/CommonViewReducer';
import FormFieldReducer from '../form-fields/js/FormFieldReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: AppFormReducer,
    modal: AppModalReducer,
    list: CommonAsyncListReducer,
    view: CommonViewReducer,
    messages: CommonMessagesReducers,
    field: FormFieldReducer,
    appCategory: CategoryReducer,
});

export default AppReducers;