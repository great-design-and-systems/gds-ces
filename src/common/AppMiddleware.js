import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

const AppMiddleware = applyMiddleware(promise(), thunk, logger());

export default AppMiddleware;