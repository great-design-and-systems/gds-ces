import {createStore} from 'redux';
import AppReducers from './AppReducers';
import AppMiddleware from './AppMiddleware';
const AppStores = createStore(AppReducers, AppMiddleware);

export default AppStores;