import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from './_rootReducer'

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  if (__CLIENT__ && process.env.NODE_ENV === 'development') middleware.push(logger())

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      __CLIENT__ && process.env.NODE_ENV === 'development' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
    ),
  )

  if (module.hot) {
    module.hot.accept('./_rootReducer', () => {
      const nextReducer = require('./_rootReducer').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}
