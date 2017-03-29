import { combineReducers } from 'redux';
import stories from './ducks/stories';

const rootReducer = combineReducers({
  stories
});

export default rootReducer;
