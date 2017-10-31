// Actions
import { API_REQUEST } from '../constants/actionTypes'

const REQUEST_TOP_STORIES = 'hackersplit/stories/REQUEST_TOP_STORIES'
const RECEIVE_TOP_STORIES = 'hackersplit/stories/RECEIVE_TOP_STORIES'
const ERROR_RECEIVE_TOP_STORIES = 'hackersplit/stories/ERROR_RECEIVE_TOP_STORIES'

const SELECT_STORY = 'hackersplit/stories/SELECT_STORY'

// Reducer
export default function reducer (state = {
  isFetching: false,
  items: [],
  currentStory: '',
  error: null
}, action = {}) {
  switch (action.type) {
    case REQUEST_TOP_STORIES:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case RECEIVE_TOP_STORIES:
      return {
        ...state,
        isFetching: false,
        items: action.response
      }

    case ERROR_RECEIVE_TOP_STORIES:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.error
      }

    case SELECT_STORY:
      return {
        ...state,
        currentStory: action.storyId
      }

    default:
      return state
  }
}

// Action Creators
export const selectStory = (storyId) => {
  return {
    type: SELECT_STORY,
    storyId
  }
}

export const fetchTopStories = () => ({
  type: API_REQUEST,
  payload: {
    endpoint: 'topstories',
    method: 'GET',
    types: [
      REQUEST_TOP_STORIES,
      RECEIVE_TOP_STORIES,
      ERROR_RECEIVE_TOP_STORIES
    ]
  }
})
