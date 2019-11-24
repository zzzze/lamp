import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import AppRoot from './components/AppRoot'
import store from './redux/store'
import { AppTypes } from '@lamp/shared'
import ProjectInitDialog from 'components/ProjectInitDialog'
import useForceUpdate from 'hooks/useForceUpdate'
import ServiceContext from 'services/service.context'
import appService from 'services/app.service'
import { ThemeProvider } from '@material-ui/core/styles'
import themeLight from './theme-light'
import themeDark from './theme'

const App: React.FC = () => {
  const forceUpdate = useForceUpdate()
  const state = store.getState()
  const themeType = useSelector((state: any) => state.app.theme)
  return (
    <ServiceContext.Provider value={{ appService }}>
      <ThemeProvider theme={themeType === 'dark' ? themeDark : themeLight}>
        {!state.app.projectRoot ? <ProjectInitDialog open onSelectProject={forceUpdate} /> : <AppRoot />}
      </ThemeProvider>
    </ServiceContext.Provider>
  )
}

export function bootstrap(context: AppTypes.BootstrapContext) {
  ;(window as any).reloadApp = () => {
    return ReactDOM.render(
      <Provider store={store}>
        <App
          key={Math.random()
            .toString(36)
            .slice(2)}
        />
      </Provider>,
      context.rootNode
    )
  }
  return (window as any).reloadApp()
}
