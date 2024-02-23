import { createStore, applyMiddleware,  compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../reducers/index';
import loggerMiddleware from './logger-middleware';
import notificationMiddleware from './notification-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import reducer, { IRootState } from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultMiddlewares = [
  thunkMiddleware,
  // errorMiddleware,
  notificationMiddleware,
  promiseMiddleware(),
  loadingBarMiddleware(),
  loggerMiddleware  
];

const initialize = (initialState?: IRootState, middlewares = []) => 
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...defaultMiddlewares, ...middlewares)));

export default initialize;
