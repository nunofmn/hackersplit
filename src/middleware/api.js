import { API_REQUEST } from '../constants/actionTypes'

const API_ENDPOINT = process.env.REACT_APP_API_URL

const apiMiddleware = ({ dispatch }) => next => async (action) => {
  if (action.type !== API_REQUEST) {
    return next(action)
  }

  const { payload } = action
  const [
    beforeAction,
    successAction,
    failureAction
  ] = payload.types

  dispatch(beforeAction())

  try {
    const response = await fetch(`${API_ENDPOINT}/${payload.endpoint}`)

    if (response.ok) {
      const json = await response.json()
      dispatch(successAction(json))
    } else {
      const error = new Error(`API returned ${response.status} code`)
      dispatch(failureAction(error))
    }
  } catch (error) {
    dispatch(failureAction(error))
  }
}

export default apiMiddleware
