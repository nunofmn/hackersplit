import { combineReducers } from 'redux'
import stories from './ducks/stories'
import content from './ducks/content'
import comments from './ducks/comments'

const rootReducer = combineReducers({
  stories,
  content,
  comments
})

export default rootReducer
