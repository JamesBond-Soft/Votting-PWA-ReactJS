import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {user} from '../reducers';

const loggerMiddleware = createLogger();

var appReducer = combineReducers({user});

export const store = createStore(
    appReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);