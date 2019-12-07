import { LError } from '../utils'
import * as Hexo from 'hexo'

export default function withWatcher(fn: any) {
  return (hexo: Hexo, ...args: any[]) => {
    let result: any = null
    const watcher = new Promise(resolve => hexo.once('generateAfter', () => resolve(result)))
    result = fn(hexo, ...args)
    if (result instanceof LError) {
      return Promise.reject(result)
    }
    return watcher
  }
}
