import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import app from './modules/app'
import equations from './modules/equations'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
    equations,
    app,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
