import * as Hexo from 'hexo'
import {IHexoInitOptions} from './types'

let defaultOptions = {
  debug: false,
  draft: true,
  silent: true,
}
export default async function hexoInit(path: string, options?: IHexoInitOptions): Promise<Hexo> {
  options = {
    ...defaultOptions,
    ...options || {},
  }
  let hexo = new Hexo(path, options)
  ;(hexo.env as any).blogPath = path
  await hexo.init()
  await hexo.watch()
  return hexo
}
