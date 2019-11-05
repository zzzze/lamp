import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// mount it on the Store
export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// then run the saga
sagaMiddleware.run(mySaga)
