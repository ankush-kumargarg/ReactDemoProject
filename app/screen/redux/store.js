import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import foodReducer from './reducers/foodReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  foodReducer: foodReducer,
  notification:notificationReducer
});

const middleware=[thunk]

const configureStore = () => createStore(rootReducer,{},composeWithDevTools(applyMiddleware(...middleware)));

export default configureStore;
