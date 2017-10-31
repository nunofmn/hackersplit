import fetchMock from 'fetch-mock'

import apiMiddleware from '../../src/middleware/api'
import { API_REQUEST } from '../../src/constants/actionTypes'

const PRE_REQUEST = 'hackersplit/api-test/pre-request'
const SUCCESS_REQUEST = 'hackersplit/api-test/success-request'
const FAILURE_REQUEST = 'hackersplit/api-test/failure-request'

const apiAction = {
  type: API_REQUEST,
  payload: {
    endpoint: 'fake',
    method: 'GET',
    types: [
      PRE_REQUEST,
      SUCCESS_REQUEST,
      FAILURE_REQUEST
    ]
  }
}

describe('Middleware - API', () => {
  let next, dispatch, middleware

  beforeEach(() => {
    next = jest.fn()
    dispatch = jest.fn()
    middleware = apiMiddleware({ dispatch })(next)
  })

  afterEach(fetchMock.restore)

  it('should ignore non-API actions', async () => {
    const nonApiAction = { type: 'hackersplit/test/non-api-action' }

    await middleware(nonApiAction)

    expect(dispatch.mock.calls.length).toBe(0)
    expect(next.mock.calls[0]).toEqual([ nonApiAction ])
    expect(fetchMock.called()).toBeFalsy()
  })

  it('should dispatch PRE_REQUEST action', async () => {
    fetchMock.getOnce('*', { test: 'test' })

    await middleware(apiAction)

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0]).toEqual([{ type: PRE_REQUEST }])
    expect(next.mock.calls.length).toBe(0)
    expect(fetchMock.called()).toBeTruthy()
  })

  it('should dispatch SUCCESS_REQUEST action', async () => {
    const response = { test: 'test' }

    fetchMock.getOnce('*', response)

    await middleware(apiAction)

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[1]).toEqual([{ type: SUCCESS_REQUEST, response }])
    expect(next.mock.calls.length).toBe(0)
    expect(fetchMock.called()).toBeTruthy()
  })

  it('should dispatch FAILURE_REQUEST action', async () => {
    const response = { status: 400 }

    fetchMock.getOnce('*', response)

    await middleware(apiAction)

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[1]).toEqual([{ type: FAILURE_REQUEST, error: response.status }])
    expect(next.mock.calls.length).toBe(0)
    expect(fetchMock.called()).toBeTruthy()
  })
})
