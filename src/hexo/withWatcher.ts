import {LError} from '../utils'
import * as Hexo from 'hexo'

export default function withWatcher(fn: any) {
  return (hexo: Hexo, ...args: any[]) => {
    let watcher = new Promise(resolve => hexo.once('generateAfter', resolve))
    let result = fn(hexo, ...args)
    if ((hexo as any).env.watch) {
      if (result instanceof LError) return Promise.reject(result)
      return watcher
    } else {
      return result
    }
  }
}
