import { BootstrapContext } from '../../shared/AppTypes'

export function getRootModule (plugins: any[]) {
  const bootstraps = plugins.reduce((result, x) => {
    if (x.bootstrap) {
      result.push(x.bootstrap)
    }
    return result
  }, [])

  if (bootstraps.length === 0) {
    throw new Error('Did not find any bootstrap components. Are there any plugins installed?')
  }
  let rootModule = {
    bootstrap: (context: BootstrapContext) => {
      return bootstraps.map((bootstrap: any) => bootstrap(context))
    },
    modules: [...plugins],
  }
  return rootModule
}
