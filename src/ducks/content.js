import { API_REQUEST } from '../constants/actionTypes'

// Actions
const REQUEST_STORY_CONTENT = 'hackersplit/content/REQUEST_STORY_CONTENT'
const RECEIVE_STORY_CONTENT = 'hackersplit/content/RECEIVE_STORY_CONTENT'
const ERROR_RECEIVE_STORY_CONTENT = 'hackersplit/content/ERROR_RECEIVE_STORY_CONTENT'

// Reducer
export default function reducer (state = {
  isFetching: false,
  isFetchingId: -1,
  content: {},
  error: null
}, action = {}) {
  switch (action.type) {
    case REQUEST_STORY_CONTENT:
      return {
        ...state,
        isFetching: true,
        isFetchingId: action.storyId,
        content: {},
        error: null
      }

    case RECEIVE_STORY_CONTENT:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        content: action.response
      }

    case ERROR_RECEIVE_STORY_CONTENT:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        content: {},
        error: action.error
      }

    default:
      return state
  }
}

// Action Creators
export const requestContent = (storyId) => ({
  type: REQUEST_STORY_CONTENT,
  storyId
})

export const fetchStoryContent = (storyId) => ({
  type: API_REQUEST,
  payload: {
    endpoint: `story/${storyId}/content`,
    method: 'GET',
    types: [
      requestContent(storyId),
      RECEIVE_STORY_CONTENT,
      ERROR_RECEIVE_STORY_CONTENT
    ]
  }
})
