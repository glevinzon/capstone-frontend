import { CALL_API } from 'redux-api-middleware'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EQUATIONS = 'wc:equations:get_equations'
export const GET_EQUATIONS_SUCCESS = 'wc:equations:get_equations_success'
export const GET_EQUATIONS_FAIL = 'wc:equations:get_equations_fail'
export const CREATE_EQUATION = 'wc:equations:create_equation'
export const CREATE_EQUATION_SUCCESS = 'wc:equations:create_equation_success'
export const CREATE_EQUATION_FAIL = 'wc:equations:create_equation_fail'
export const GET_EQUATION = 'wc:equations:get_equation'
export const GET_EQUATION_SUCCESS = 'wc:equations:get_equation_success'
export const GET_EQUATION_FAIL = 'wc:equations:get_equation_fail'
export const UPDATE_EQUATION = 'wc:equations:update_equation'
export const UPDATE_EQUATION_SUCCESS = 'wc:equations:update_equation_success'
export const UPDATE_EQUATION_FAIL = 'wc:equations:update_equation_fail'

// ------------------------------------
// Actions
// ------------------------------------
export function getEquations () {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/equations',
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        types: [GET_EQUATIONS, GET_EQUATIONS_SUCCESS, GET_EQUATIONS_FAIL]
      }
    })
  }
}

export function createEquation (data) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/equations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_EQUATION,
          {
            type: CREATE_EQUATION_SUCCESS,
            meta: {
              done: true,
              transition: {
                success: (prevState, nextStatem, res) => {
                  return { pathname: '/' }
                }
              }
            }
          },
          CREATE_EQUATION_FAIL
        ]
      }
    })
  }
}

export function getEquation (eqId) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/equations/${eqId}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        types: [GET_EQUATION, GET_EQUATION_SUCCESS, GET_EQUATION_FAIL]
      }
    })
  }
}

export function updateEquation (data, eqId) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/equations/${eqId}`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [UPDATE_EQUATION, UPDATE_EQUATION_SUCCESS, UPDATE_EQUATION_FAIL]
      }
    })
  }
}

const emptyErrors = {
  equationCreationErrors: [],
  equationUpdateErrors: []
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EQUATIONS]: (state) => ({
    ...state,
    fetchingEquations: true,
    createSuccess: false,
    updateSuccess: false,
    ...emptyErrors
  }),
  [GET_EQUATIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingEquations: false,
      list: action.payload.data
    }
  },
  [GET_EQUATIONS_FAIL]: (state, action) => ({
    ...state,
    fetchingEquations: false
  }),
  [CREATE_EQUATION]: (state) => ({
    ...state,
    creatingEquation: true,
    createSuccess: false,
    createdEquation: null,
    ...emptyErrors
  }),
  [CREATE_EQUATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      creatingEquation: false,
      createSuccess: true,
      createdEquation: action.payload.data
    }
  },
  [CREATE_EQUATION_FAIL]: (state, action) => ({
    ...state,
    creatingEquation: false,
    createSuccess: false,
    createdEquation: null,
    equationCreationErrors: action.payload.response.errors
  }),
  [GET_EQUATION]: (state) => ({
    ...state,
    fetchingEquation: true
  }),
  [GET_EQUATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingEquation: false,
      equation: action.payload.data
    }
  },
  [GET_EQUATION_FAIL]: (state, action) => ({
    ...state,
    fetchingEquation: false
  }),
  [UPDATE_EQUATION]: (state) => ({
    ...state,
    updatingEquation: true,
    updateSuccess: false,
    updatedEquation: null,
    ...emptyErrors
  }),
  [UPDATE_EQUATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      updatingEquation: false,
      updateSuccess: true,
      updatedEquation: action.payload.data
    }
  },
  [UPDATE_EQUATION_FAIL]: (state, action) => ({
    ...state,
    updatingEquation: false,
    updateSuccess: false,
    updatedEquation: null,
    equationUpdateErrors: action.payload.response.errors
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingEquations: false,
  list: [],
  equationCreationErrors: [],
  equationUpdateErrors: [],
  createdEquation: null,
  createSuccess: false,
  creatingEquation: false,
  updatedEquation: null,
  updateSuccess: false,
  updatingEquation: false,
  equation: [],
  fetchingEquation: false
}
export default function equationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}