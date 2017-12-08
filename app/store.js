import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)))
