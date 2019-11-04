import { combineReducers } from 'redux'
import appReducer from './app.reducer'
import hexoReducer from './hexo.reducer'

export default combineReducers({
  app: appReducer,
  hexo: hexoReducer,
})
