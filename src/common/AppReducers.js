import ApiServiceReducer from '../api/ApiServiceReducer';
import AppModalReducer from '../app/-modal/js/AppModalReducer';
import { CategoryReducer, FieldReducer, FormReducer ,ManualEntryReducer, OnlineSearchReducer, CatalogingReducer} from '../app/js/AppReducers';
import CommonAsyncListReducer from './async-list/js/CommonAsyncListReducer';
import CommonMessagesReducers from './messages/js/CommonMessagesReducer';
import CommonViewReducer from './view/js/CommonViewReducer';
import { combineReducers } from 'redux';
import CommonBodyReducer from './body/js/CommonBodyReducer';

const AppReducers = combineReducers({
    api: ApiServiceReducer,
    form: FormReducer,
    modal: AppModalReducer,
    list: CommonAsyncListReducer,
    view: CommonViewReducer,
    messages: CommonMessagesReducers,
    field: FieldReducer,
    appCategory: CategoryReducer,
    manualEntry: ManualEntryReducer,
    onlineSearch: OnlineSearchReducer,
    cataloging: CatalogingReducer,
    body: CommonBodyReducer
});

export default AppReducers;