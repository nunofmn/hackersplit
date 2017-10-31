import { API_REQUEST } from '../constants/actionTypes'

// Actions
const REQUEST_COMMENTS_BY_STORY = 'hackersplit/comments/REQUEST_COMMENTS_BY_STORY'
const RECEIVE_COMMENTS_BY_STORY = 'hackersplit/comments/RECEIVE_COMMENTS_BY_STORY'
const ERROR_RECEIVE_COMMENTS_BY_STORY = 'hackersplit/comments/ERROR_RECEIVE_COMMENTS_BY_STORY'

// Reducer
export default function reducer (state = {
  isFetching: false,
  isFetchingId: -1,
  comments: [],
  error: null
}, action = {}) {
  switch (action.type) {
    case REQUEST_COMMENTS_BY_STORY:
      return {
        ...state,
        isFetching: true,
        isFetchingId: action.storyId,
        comments: [],
        error: null
      }

    case RECEIVE_COMMENTS_BY_STORY:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        comments: action.response,
        error: null
      }

    case ERROR_RECEIVE_COMMENTS_BY_STORY:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        error: action.error
      }

    default:
      return state
  }
}

// Action Creators
function requestComments (storyId) {
  return {
    type: RECEIVE_COMMENTS_BY_STORY,
    storyId
  }
}

export const fetchStoryComments = (storyId) => ({
  type: API_REQUEST,
  payload: {
    endpoint: `story/${storyId}/comments`,
    method: 'GET',
    types: [
      requestComments(storyId),
      RECEIVE_COMMENTS_BY_STORY,
      ERROR_RECEIVE_COMMENTS_BY_STORY
    ]
  }
})
