import { combineReducers } from 'redux';
import stories from './ducks/stories';
import content from './ducks/content';

const rootReducer = combineReducers({
  stories,
  content
});

export default rootReducer;
