import * as React from 'react'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'

export default {}
export function bootstrap() {
  return (
    <Provider store={store}>
      <div>Hello World!</div>
      <AppRoot></AppRoot>
    </Provider>
  )
}
