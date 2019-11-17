import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'
import { AppTypes } from '@lamp/shared'
import ProjectInitDialog from 'components/ProjectInitDialog'
import useForceUpdate from 'hooks/useForceUpdate'

const App: React.FC = () => {
  const forceUpdate = useForceUpdate()
  const state = store.getState()
  return (
    <Provider store={store}>
      {!state.app.projectRoot && <ProjectInitDialog open onSelectProject={forceUpdate} />}
      {state.app.projectRoot && <AppRoot />}
    </Provider>
  )
}

export function bootstrap(context: AppTypes.BootstrapContext) {
  return ReactDOM.render(<App />, context.rootNode)
}
