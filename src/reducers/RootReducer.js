import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import commonReducer from './CommonReducer';

export default combineReducers({
    userReducer,
    commonReducer
});