import * as Hexo from 'hexo'
import {IHexoInitOptions} from './types'

let hexo = null
export default async function hexoInit(path: string, options: IHexoInitOptions, watch = false): Promise<Hexo> {
  let shouldInit = options.reload
  let shouldCache = typeof options.cache === 'undefined' || options.cache
  let _hexo = hexo
  if (!_hexo || !shouldCache) {
    shouldInit = true
    _hexo = new Hexo(path, options)
    _hexo._path = path
  }
  if (shouldCache) {
    hexo = _hexo
  }
  if (shouldInit) {
    await _hexo.init()
    if (watch) {
      await _hexo.watch()
    } else {
      await _hexo.load()
    }
  }
  return _hexo
}
