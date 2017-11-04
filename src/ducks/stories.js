// Actions
import { API_REQUEST } from '../constants/actionTypes'

export const REQUEST_TOP_STORIES = 'hackersplit/stories/REQUEST_TOP_STORIES'
export const RECEIVE_TOP_STORIES = 'hackersplit/stories/RECEIVE_TOP_STORIES'
export const ERROR_RECEIVE_TOP_STORIES = 'hackersplit/stories/ERROR_RECEIVE_TOP_STORIES'

export const SELECT_STORY = 'hackersplit/stories/SELECT_STORY'

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
        items: action.payload.stories
      }

    case ERROR_RECEIVE_TOP_STORIES:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.payload.error
      }

    case SELECT_STORY:
      return {
        ...state,
        currentStory: action.payload.storyId
      }

    default:
      return state
  }
}

// Action Creators
export const selectStory = (storyId) => {
  return {
    type: SELECT_STORY,
    payload: {
      storyId
    }
  }
}

export const requestTopStories = () => ({
  type: SELECT_STORY
})

export const receiveTopStories = (stories) => ({
  type: RECEIVE_TOP_STORIES,
  payload: {
    stories
  }
})

export const errorReceiveTopStories = (error) => ({
  type: ERROR_RECEIVE_TOP_STORIES,
  error: true,
  payload: error
})

export const fetchTopStories = () => ({
  type: API_REQUEST,
  payload: {
    endpoint: 'topstories',
    method: 'GET',
    types: [
      requestTopStories,
      receiveTopStories,
      errorReceiveTopStories
    ]
  }
})
