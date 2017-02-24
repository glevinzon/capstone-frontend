import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { persistStore, autoRehydrate } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'
import handleTransitions from 'redux-history-transitions'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, apiMiddleware, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [
    handleTransitions(history)
  ]
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      autoRehydrate(),
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  persistStore(store, { whitelist: ['login', 'cart', 'transaction'] })

  return store
}
