import {AppTypes} from '@lamp/shared'

export function getRootModule(plugins: any[]) {
  const bootstraps = plugins.reduce((result, x) => {
    if (x.bootstrap) {
      result.push(x.bootstrap)
    }
    return result
  }, [])

  if (bootstraps.length === 0) {
    throw new Error('Did not find any bootstrap components. Are there any plugins installed?')
  }
  const rootModule = {
    bootstrap: (context: AppTypes.BootstrapContext) => {
      return bootstraps.map((bootstrap: any) => bootstrap(context))
    },
    modules: [...plugins],
  }
  return rootModule
}
