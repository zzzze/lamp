import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRoot from './components/AppRoot'
import AppService from './services/app'
import store from './redux/store'
import { AppTypes } from '@lamp/shared'


const App = () => {
  let appService = new AppService(store)

  let renderEditor: any = appService.getEditor()
  return (
    <Provider store={store}>
    <div className='editor-wrapper'>编辑器</div>
    {renderEditor()}
    <AppRoot />
    </Provider>
  )
}

export function bootstrap(context: AppTypes.BootstrapContext) {
  return ReactDOM.render(<App />, context.rootNode)
}
