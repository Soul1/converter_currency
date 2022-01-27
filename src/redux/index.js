import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {currency, } from './reducers';

const reducers = combineReducers({
  currency,
})

export const store = createStore(reducers, applyMiddleware(thunk));
