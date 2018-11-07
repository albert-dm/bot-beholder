import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import CommonReducer from './CommonReducer';
import BotReducer from './BotReducer';
import TestReducer from './TestReducer';

export default combineReducers({
    user: UserReducer,
    common: CommonReducer,
    bot: BotReducer,
    test: TestReducer
});