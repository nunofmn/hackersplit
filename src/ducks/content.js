const API_ENDPOINT = process.env.REACT_APP_API_URL

// Actions
const REQUEST_STORY_CONTENT = 'hackersplit/content/REQUEST_STORY_CONTENT'
const RECEIVE_STORY_CONTENT = 'hackersplit/content/RECEIVE_STORY_CONTENT'

// Reducer
export default function reducer (state = {
  isFetching: false,
  isFetchingId: -1,
  content: {}
}, action = {}) {
  switch (action.type) {
    case REQUEST_STORY_CONTENT:
      return {
        ...state,
        isFetching: true,
        isFetchingId: action.storyId,
        content: {}
      }

    case RECEIVE_STORY_CONTENT:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        content: action.content
      }

    default:
      return state
  }
};

// Action Creators
function receiveContent (data) {
  return {
    type: RECEIVE_STORY_CONTENT,
    content: data
  }
};

function requestContent (storyId) {
  return {
    type: REQUEST_STORY_CONTENT,
    storyId
  }
};

export function fetchStoryContent (storyId) {
  return dispatch => {
    dispatch(requestContent())

    return fetch(`${API_ENDPOINT}/story/${storyId}/content`)
      .then(response => response.json())
      .then(json => dispatch(receiveContent(json)))
  }
};
