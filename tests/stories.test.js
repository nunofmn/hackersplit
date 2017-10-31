import deepFreeze from 'deep-freeze'

import reducer from '../src/ducks/stories'
import {
  REQUEST_TOP_STORIES,
  RECEIVE_TOP_STORIES,
  ERROR_RECEIVE_TOP_STORIES,
  SELECT_STORY
} from '../src/ducks/stories'

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

  it('should handle REQUEST_TOP_STORIES', () => {
    const baseState = reducer(deepFreeze(initialState), { type: REQUEST_TOP_STORIES })

    const expected = {
      ...initialState,
      isFetching: true,
      error: null
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle RECEIVE_TOP_STORIES', () => {
    const action = {
      type: RECEIVE_TOP_STORIES,
      response: [
        { by: 'author1', title: 'Fake News' },
        { by: 'author2', title: 'Fake News' }
      ]
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      isFetching: false,
      items: action.response
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle ERROR_RECEIVE_TOP_STORIES', () => {
    const action = {
      type: ERROR_RECEIVE_TOP_STORIES,
      error: 400
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      isFetching: false,
      items: [],
      error: action.error
    }

    expect(baseState).toEqual(expected)
  })

  it('should handle SELECT_STORY', () => {
    const action = {
      type: SELECT_STORY,
      storyId: 1
    }

    const baseState = reducer(deepFreeze(initialState), action)

    const expected = {
      ...initialState,
      currentStory: action.storyId
    }

    expect(baseState).toEqual(expected)
  })
})
