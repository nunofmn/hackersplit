import deepFreeze from 'deep-freeze'

import reducer, {
  requestTopStories,
  receiveTopStories,
  errorReceiveTopStories,
  selectStory,
  fetchTopStories,
  REQUEST_TOP_STORIES,
  RECEIVE_TOP_STORIES,
  ERROR_RECEIVE_TOP_STORIES,
  SELECT_STORY
} from '../src/ducks/stories'

import { API_REQUEST } from '../src/constants/actionTypes'

describe('stories reducer', () => {
  const initialState = reducer({}, {})

  it('should return the initial state', () => {
    const expected = {
      isFetching: false,
      items: [],
      currentStory: '',
      error: null
    }

    expect(reducer(undefined, {})).toEqual(expected)
  })

  it('should handle REQUEST_TOP_STORIES action', () => {
    const baseState = reducer(deepFreeze(initialState), { type: REQUEST_TOP_STORIES })

    const expected = {
      ...initialState,
      isFetching: true,
      error: null
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle RECEIVE_TOP_STORIES action', () => {
    const action = {
      type: RECEIVE_TOP_STORIES,
      payload: {
        stories: [
          { by: 'author1', title: 'Fake News' },
          { by: 'author2', title: 'Fake News' }
        ]
      }
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      isFetching: false,
      items: action.payload.stories
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle ERROR_RECEIVE_TOP_STORIES action', () => {
    const action = {
      type: ERROR_RECEIVE_TOP_STORIES,
      error: true,
      payload: new Error('Error test.')
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      isFetching: false,
      items: [],
      error: action.payload.error
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle SELECT_STORY action', () => {
    const action = {
      type: SELECT_STORY,
      payload: {
        storyId: 1
      }
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      currentStory: action.payload.storyId
    }

    expect(baseState).toEqual(expected)
  })
})

describe('stories action creators', () => {
  it('should create a action to select the story', () => {
    const expected = {
      type: SELECT_STORY,
      payload: {
        storyId: 1
      }
    }

    expect(selectStory(1)).toEqual(expected)
  })

  it('should create a action to request the stories', () => {
    const expected = {
      type: REQUEST_TOP_STORIES
    }

    expect(requestTopStories()).toEqual(expected)
  })

  it('should create a action to receive the stories', () => {
    const stories = [
      { by: 'author1', title: 'Fake News' },
      { by: 'author2', title: 'Fake News' }
    ]
    const expected = {
      type: RECEIVE_TOP_STORIES,
      payload: {
        stories
      }
    }

    expect(receiveTopStories(stories)).toEqual(expected)
  })

  it('should create a action to inform error in fetching stories', () => {
    const error = new Error('Error test.')
    const expected = {
      type: ERROR_RECEIVE_TOP_STORIES,
      error: true,
      payload: error
    }

    expect(errorReceiveTopStories(error)).toEqual(expected)
  })

  it('should create a action to perform a API request', () => {
    const expected = {
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
    }

    expect(fetchTopStories()).toEqual(expected)
  })
})
