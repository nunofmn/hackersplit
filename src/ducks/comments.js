const API_ENDPOINT = 'http://localhost:8000/api';

// Actions
const REQUEST_COMMENTS_BY_STORY = 'hackersplit/comments/REQUEST_COMMENTS_BY_STORY';
const RECEIVE_COMMENTS_BY_STORY = 'hackersplit/comments/RECEIVE_COMMENTS_BY_STORY';

// Reducer
export default function reducer(state = {
  isFetching: false,
  isFetchingId: -1,
  comments: []
}, action = {}) {
  switch (action.type) {
    case REQUEST_COMMENTS_BY_STORY:
      return {
        ...state,
        isFetching: true,
        isFetchingId: action.storyId,
        comments: []
      };

    case RECEIVE_COMMENTS_BY_STORY:
      return {
        ...state,
        isFetching: false,
        isFetchingId: -1,
        comments: action.comments
      };

    default:
      return state;
  }
};

// Action Creators
function receiveComments(data) {
  return {
    type: RECEIVE_COMMENTS_BY_STORY,
    comments: data
  };
};

function requestComments(storyId) {
  return {
    type: RECEIVE_COMMENTS_BY_STORY,
    storyId
  };
};

export function fetchStoryComments(storyId) {
  return dispatch => {
    dispatch(requestComments());

    return fetch(`${API_ENDPOINT}/story/${storyId}/comments`)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)));
  };
};
