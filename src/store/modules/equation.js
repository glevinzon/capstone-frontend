import { CALL_API } from 'redux-api-middleware'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHOPS = 'ca:shops:get_shops'
export const GET_SHOPS_SUCCESS = 'ca:shops:get_shops_success'
export const GET_SHOPS_FAIL = 'ca:shops:get_shops_fail'
export const CREATE_SHOP = 'ca:shops:create_shop'
export const CREATE_SHOP_SUCCESS = 'ca:shops:create_shop_success'
export const CREATE_SHOP_FAIL = 'ca:shops:create_shop_fail'
export const GET_SHOP = 'ca:shops:get_shop'
export const GET_SHOP_SUCCESS = 'ca:shops:get_shop_success'
export const GET_SHOP_FAIL = 'ca:shops:get_shop_fail'
export const UPDATE_SHOP = 'ca:shops:update_shop'
export const UPDATE_SHOP_SUCCESS = 'ca:shops:update_shop_success'
export const UPDATE_SHOP_FAIL = 'ca:shops:update_shop_fail'

// ------------------------------------
// Actions
// ------------------------------------
export function getShops () {
  return (dispatch, getState) => {
    dispatch(showLoading())

    const { login: { token } } = getState()

    return dispatch({
      [CALL_API]: {
        endpoint: '/api/shops',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        types: [GET_SHOPS, GET_SHOPS_SUCCESS, GET_SHOPS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createShop ({ name, address, description }) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    const { login: { token } } = getState()

    return dispatch({
      [CALL_API]: {
        endpoint: '/api/shops',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          address,
          description
        }),
        types: [
          CREATE_SHOP,
          {
            type: CREATE_SHOP_SUCCESS,
            meta: {
              done: true,
              transition: {
                success: (prevState, nextStatem, res) => {
                  return { pathname: '/admin' }
                }
              }
            }
          },
          CREATE_SHOP_FAIL
        ]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getShop (shopId) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    const { login: { token } } = getState()

    return dispatch({
      [CALL_API]: {
        endpoint: `/api/shops/${shopId}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        types: [GET_SHOP, GET_SHOP_SUCCESS, GET_SHOP_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function updateShop (data, shopId) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    const { login: { token } } = getState()

    return dispatch({
      [CALL_API]: {
        endpoint: `/api/shops/${shopId}`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
        types: [UPDATE_SHOP, UPDATE_SHOP_SUCCESS, UPDATE_SHOP_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

const emptyErrors = {
  shopCreationErrors: [],
  shopUpdateErrors: []
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SHOPS]: (state) => ({
    ...state,
    fetchingShops: true,
    createSuccess: false,
    updateSuccess: false,
    ...emptyErrors
  }),
  [GET_SHOPS_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingShops: false,
      list: action.payload.data
    }
  },
  [GET_SHOPS_FAIL]: (state, action) => ({
    ...state,
    fetchingShops: false
  }),
  [CREATE_SHOP]: (state) => ({
    ...state,
    creatingShop: true,
    createSuccess: false,
    createdShop: null,
    ...emptyErrors
  }),
  [CREATE_SHOP_SUCCESS]: (state, action) => {
    return {
      ...state,
      creatingShop: false,
      createSuccess: true,
      createdShop: action.payload.data
    }
  },
  [CREATE_SHOP_FAIL]: (state, action) => ({
    ...state,
    creatingShop: false,
    createSuccess: false,
    createdShop: null,
    shopCreationErrors: action.payload.response.errors
  }),
  [GET_SHOP]: (state) => ({
    ...state,
    fetchingShop: true
  }),
  [GET_SHOP_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingShop: false,
      shop: action.payload.data
    }
  },
  [GET_SHOP_FAIL]: (state, action) => ({
    ...state,
    fetchingShop: false
  }),
  [UPDATE_SHOP]: (state) => ({
    ...state,
    updatingShop: true,
    updateSuccess: false,
    updatedShop: null,
    ...emptyErrors
  }),
  [UPDATE_SHOP_SUCCESS]: (state, action) => {
    return {
      ...state,
      updatingShop: false,
      updateSuccess: true,
      updatedShop: action.payload.data
    }
  },
  [UPDATE_SHOP_FAIL]: (state, action) => ({
    ...state,
    updatingShop: false,
    updateSuccess: false,
    updatedShop: null,
    shopUpdateErrors: action.payload.response.errors
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingShops: false,
  list: [],
  shopCreationErrors: [],
  shopUpdateErrors: [],
  createdShop: null,
  createSuccess: false,
  creatingShop: false,
  updatedShop: null,
  updateSuccess: false,
  updatingShop: false,
  shop: [],
  fetchingShop: false
}
export default function shopsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
