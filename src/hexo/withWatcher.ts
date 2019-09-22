import LError from '../utils/LError'
export default function withWatcher(fn: any) {
  return (hexo, ...args: any[]) => {
    let watcher = new Promise(resolve => hexo.once('generateAfter', resolve))
    let result = fn(hexo, ...args)
    if (hexo.env.watch) {
      if (result instanceof LError) return Promise.reject(result)
      return watcher
    } else {
      return result
    }
  }
}
