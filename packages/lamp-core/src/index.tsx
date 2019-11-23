import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'
import { AppTypes } from '@lamp/shared'
import ProjectInitDialog from 'components/ProjectInitDialog'
import useForceUpdate from 'hooks/useForceUpdate'
import ServiceContext from 'services/service.context'
import appService from 'services/app.service'

const App: React.FC = () => {
  const forceUpdate = useForceUpdate()
  const state = store.getState()
  return (
    <Provider store={store}>
      <ServiceContext.Provider value={{ appService }}>
        {!state.app.projectRoot ? <ProjectInitDialog open onSelectProject={forceUpdate} /> : <AppRoot />}
      </ServiceContext.Provider>
    </Provider>
  )
}

export function bootstrap(context: AppTypes.BootstrapContext) {
  ;(window as any).reloadApp = () => {
    return ReactDOM.render(
      <App
        key={Math.random()
          .toString(36)
          .slice(2)}
      />,
      context.rootNode
    )
  }
  return (window as any).reloadApp()
}
