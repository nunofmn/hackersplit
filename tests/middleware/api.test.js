import fetchMock from 'fetch-mock'

import apiMiddleware from '../../src/middleware/api'
import { API_REQUEST } from '../../src/constants/actionTypes'

const PRE_REQUEST = 'hackersplit/api-test/pre-request'
const SUCCESS_REQUEST = 'hackersplit/api-test/success-request'
const FAILURE_REQUEST = 'hackersplit/api-test/failure-request'

const preRequest = () => ({ type: PRE_REQUEST })
const successRequest = (data) => (
  {
    type: SUCCESS_REQUEST,
    payload: { data }
  }
)
const failureRequest = (errorInfo) => (
  {
    type: FAILURE_REQUEST,
    error: true,
    payload: {
      error: errorInfo
    }
  }
)

const apiActionMock = () => ({
  type: API_REQUEST,
  payload: {
    endpoint: 'fake',
    method: 'GET',
    types: [
      preRequest,
      successRequest,
      failureRequest
    ].map(type => jest.fn(type))
  }
})

describe('Middleware - API', () => {
  let next, dispatch, middleware, apiAction

  beforeEach(() => {
    next = jest.fn()
    dispatch = jest.fn()
    middleware = apiMiddleware({ dispatch })(next)
    apiAction = apiActionMock()
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

    const preRequestMockCalls = apiAction.payload.types[0].calls[0][0]

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0][0]).toEqual(preRequest())

    expect(preRequestMockCalls.mock.calls.length).toBe(1)

    expect(next.mock.calls.length).toBe(0)

    expect(fetchMock.called()).toBeTruthy()
  })

  it('should dispatch SUCCESS_REQUEST action', async () => {
    const response = { test: 'test' }

    fetchMock.getOnce('*', response)

    await middleware(apiAction)

    const successRequestMockCalls = apiAction.payload.types[1].calls

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[1][0]).toEqual(successRequest(response))

    expect(successRequestMockCalls.length).toBe(1)
    expect(successRequestMockCalls[0][0]).toEqual(response)

    expect(next.mock.calls.length).toBe(0)

    expect(fetchMock.called()).toBeTruthy()
  })

  it('should dispatch FAILURE_REQUEST action', async () => {
    const response = { status: 400 }

    fetchMock.getOnce('*', response)

    await middleware(apiAction)

    const failureRequestMockCalls = apiAction.payload.types[2].mock.calls
    const errorResponse = new Error('API returned 400 code')

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[1][0]).toEqual(failureRequest(errorResponse))

    expect(failureRequestMockCalls.length).toBe(1)
    expect(failureRequestMockCalls[0][0]).toEqual(errorResponse)

    expect(next.mock.calls.length).toBe(0)

    expect(fetchMock.called()).toBeTruthy()
  })
})
