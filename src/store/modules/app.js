import { CALL_API } from 'redux-api-middleware'

export const CONNECT = 'hp:connect'
export const CONNECT_SUCCESS = 'hp:connect_success'
export const CONNECT_FAIL = 'hp:connect_fail'

export function connectApi () {
  return {
    [CALL_API]: {
      endpoint: '/api/',
      method: 'GET',
      types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL]
    }
  }
};

export const actions = {
  connectApi
}

const ACTION_HANDLERS = {
  [CONNECT]: state => ({
    ...state,
    loadingConnect: true
  }),
  [CONNECT_SUCCESS]: (state, action) => ({
    ...state,
    connect: action.payload,
    loadingConnect: false
  }),
  [CONNECT_FAIL]: (state, action) => ({
    ...state,
    connect: null,
    connectError: action.payload,
    loadingConnect: false
  })
}

const initialState = {
  loadingConnect: false
}
export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
