import * as React from 'react'
import useAppService from '../hooks/useAppService'

const defaultTabs = [{name: 'test'}]

export default function AppRoot() {
  let [tabs, appService] = useAppService(defaultTabs)
  const rootModule = (window as any).rootModule
  const buttons = rootModule.modules.reduce((result, _module) => {
    if (_module.providers && _module.providers.toolbarButtonProvidor) {
      let buttonInfo = _module.providers.toolbarButtonProvidor(appService)
      result.push(<button key={buttonInfo.name} onClick={buttonInfo.click}>{buttonInfo.name}</button>)
    }
    return result
  }, [])
  return (
    <div>
    {buttons}
    {tabs.map(tab => (
      <div key={tab.name}>{tab.name}</div>
    ))}
    </div>
  )
}
