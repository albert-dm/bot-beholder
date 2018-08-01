import { combineReducers } from 'redux';
import simpleReducer from './SimpleReducer';
import loginReducer from './LoginReducer';

export default combineReducers({
    simpleReducer,
    loginReducer
});