import ApiMiddleware from '../api/ApiMiddleware';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const AppMiddleware = applyMiddleware(thunk, logger(), ApiMiddleware);

export default AppMiddleware;