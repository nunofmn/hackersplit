const API_ENDPOINT = 'http://localhost:8000/api/topstories';

// Actions
const REQUEST_TOP_STORIES = 'hackersplit/stories/REQUEST_TOP_STORIES';
const RECEIVE_TOP_STORIES = 'hackersplit/stories/RECEIVE_TOP_STORIES';
const SELECT_STORY = 'hackersplit/stories/SELECT_STORY';

// Reducer
export default function reducer(state = {
  isFetching: false,
  items: [],
  currentStory: ''
}, action = {}) {
  switch (action.type) {
    case REQUEST_TOP_STORIES:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_TOP_STORIES:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };

    case SELECT_STORY:
      return {
        ...state,
        currentStory: action.storyId
      };

    default:
      return state;
  }
};

// Action Creators
function receiveStories(data) {
  return {
    type: RECEIVE_TOP_STORIES,
    items: data
  };
};

function requestStories() {
  return {
    type: REQUEST_TOP_STORIES
  };
};

export function selectStory(storyId) {
  return {
    type: SELECT_STORY,
    storyId
  };
};

export function fetchTopStories() {
  return dispatch => {
    dispatch(requestStories());

    return fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => dispatch(receiveStories(json)));
  };
};
