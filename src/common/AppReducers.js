import ApiServiceReducer from '../api/ApiServiceReducer';
import AppModalReducer from '../app/-modal/js/AppModalReducer';
import { CategoryReducer, FieldReducer, FormReducer } from '../app/js/AppReducers';
import CommonAsyncListReducer from './async-list/js/CommonAsyncListReducer';
import CommonMessagesReducers from './messages/js/CommonMessagesReducer';
import CommonViewReducer from './view/js/CommonViewReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: FormReducer,
    modal: AppModalReducer,
    list: CommonAsyncListReducer,
    view: CommonViewReducer,
    messages: CommonMessagesReducers,
    field: FieldReducer,
    appCategory: CategoryReducer,
});

export default AppReducers;