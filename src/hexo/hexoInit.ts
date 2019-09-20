import * as Hexo from 'hexo'
import {IHexoInitOptions} from './types'

let hexo = null
export default async function hexoInit(path: string, options: IHexoInitOptions, watch = false): Promise<Hexo> {
  if (!hexo || options.reload) {
    hexo = new Hexo(path, options)
  }
  await hexo.init()
  if (watch) {
    await hexo.watch()
  } else {
    await hexo.load()
  }
  return hexo
}
