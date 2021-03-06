import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import apiMiddleware from '../middleware/api'

import rootReducer from '../reducer'

export default function configure (initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    apiMiddleware,
    thunk,
    createLogger()
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
