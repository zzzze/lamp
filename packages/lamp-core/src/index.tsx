import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'
import { AppTypes } from '@lamp/shared'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  )
}

export function bootstrap(context: AppTypes.BootstrapContext) {
  return ReactDOM.render(<App />, context.rootNode)
}
