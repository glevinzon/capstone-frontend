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
export const DELETE_EQUATION = 'wc:equation:delete_equation'
export const DELETE_EQUATION_SUCCESS = 'wc:equation:delete_equation_success'
export const DELETE_EQUATION_FAIL = 'wc:equation:delete_equation_fail'

// ------------------------------------
// Actions
// ------------------------------------
export function getEquations (filter = null, page = 1, count = 10) {
  return (dispatch, getState) => {
    let endpoint = `/api/equations?filter=${filter}&page=${page}&count=${count}`
    return dispatch({
      [CALL_API]: {
        endpoint,
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

export function getEquationsBySearch (by, keyword) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/search?by=${by}&keyword=${keyword}`,
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

export function deleteEquation (eqId) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/equation/${eqId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [DELETE_EQUATION, DELETE_EQUATION_SUCCESS, DELETE_EQUATION_FAIL]
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
    deleteEquationSuccess: false,
    fetchingEquationSuccess: false,
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
    fetchingEquationBySearch: true,
    createSuccess: false,
    updateSuccess: false,
    deleteEquationSuccess: false,
    fetchingEquationSuccess: false
  }),
  [GET_EQUATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingEquationBySearch: false,
      fetchingEquationSuccess: true,
      equationsBySearch: action.payload.data
    }
  },
  [GET_EQUATION_FAIL]: (state, action) => ({
    ...state,
    fetchingEquationBySearch: false,
    fetchingEquationSuccess: false
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
  }),
  [DELETE_EQUATION]: (state) => ({
    ...state,
    deletingEquation: true,
    deleteEquationSuccess: false,
    deleteEquationResponse: null,
    deleteEquationErrors: []
  }),
  [DELETE_EQUATION_SUCCESS]: (state, action) => ({
    ...state,
    deletingEquation: false,
    deleteEquationSuccess: true,
    deleteEquationResponse: action.payload.data
  }),
  [DELETE_EQUATION_FAIL]: (state, action) => ({
    ...state,
    deletingEquation: false,
    deleteEquationSuccess: false,
    deleteEquationResponse: null,
    deleteEquationErrors: action.payload.response.errors
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingEquations: false,
  list: {},
  equationCreationErrors: [],
  equationUpdateErrors: [],
  createdEquation: null,
  createSuccess: false,
  creatingEquation: false,
  updatedEquation: null,
  updateSuccess: false,
  updatingEquation: false,
  equationsBySearch: [],
  fetchingEquationBySearch: false,
  fetchingEquationSuccess: false,
  deletingEquation: false,
  deleteEquationSuccess: false,
  deleteEquationResponse: null,
  deleteEquationErrors: []
}
export default function equationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
