// import {useState, useEffect} from 'react'
// import * as yaml from 'js-yaml'
// import * as path from 'path'
// import * as electron from 'electron'
//
// const configMerge = (a, b) => require('deepmerge')(a, b, { arrayMerge: (_d, s) => s })
//
// export interface ITab {
//   name: string
// }
//
// export interface IAddTab {
//   (newTab: ITab): void
// }
//
// export interface IAppService {
//   addTab: IAddTab
// }
//
// const rootModule = (window as any).rootModule
// const configProviders = rootModule.modules.reduce((result, _module) => {
//   if (_module.providers && _module.providers.configProvider) {
//     result.push(_module.providers.configProvider)
//   }
//   return result
// }, [])
//
// // TODO:
// const hostApp = {
//   platform: 'drwin'
// }
//
// const defaults = configProviders.map(provider => {
//   let defaults = {}
//   if (provider.platformDefaults) {
//     defaults = configMerge(defaults, provider.platformDefaults[hostApp.platform] || {})
//   }
//   if (provider.defaults) {
//     defaults = configMerge(defaults, provider.defaults)
//   }
//   return defaults
// }).reduce(configMerge)
//
// export default function useConfig() {
//   const configPath = path.join(electron.app.getPath('userData'), 'config.yaml')
//   const [tabs, setTabs] = useState<ITab>(defaultTabs)
//   let addTab: IAddTab = newTab => setTabs([...tabs, newTab])
//   let appService: IAppService = {addTab}
//   useEffect(() => {
//   }, [])
//   return [tabs, appService]
// }
