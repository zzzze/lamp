import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'
import { BootstrapContext } from '../../shared/AppTypes'

export default {}

const App = () => (
  <Provider store={store}>
    <div>Hello World!</div>
    <AppRoot />
  </Provider>
)

export function bootstrap(context: BootstrapContext) {
  return ReactDOM.render(<App />, context.rootNode)
}
