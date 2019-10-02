import * as Hexo from 'hexo'
import {IHexoInitOptions} from './types'

let hexo = null
let defaultOptions = {
  debug: false,
  draft: true,
  silent: true,
  reload: false,
  cache: true,
}
export default async function hexoInit(path: string, options: IHexoInitOptions): Promise<Hexo> {
  options = {
    ...defaultOptions,
    ...options,
  }
  let _hexo = hexo
  if (!_hexo || options.reload) {
    if (_hexo) hexo.unwatch()
    _hexo = new Hexo(path, options)
    _hexo.env.blogPath = path
    await _hexo.init()
    await _hexo.watch()
  }
  if (options.cache) {
    hexo = _hexo
  }
  return _hexo
}
