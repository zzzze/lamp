import * as Hexo from 'hexo'
import { IHexoInitOptions } from './types'

const defaultOptions = {
  debug: false,
  draft: true,
  silent: true,
}
export default async function hexoInit(path: string, options?: IHexoInitOptions): Promise<Hexo> {
  options = {
    ...defaultOptions,
    ...(options || {}),
  }
  const hexo = new (Hexo as any)(path, options)
  ;(hexo.env as any).blogPath = path
  await hexo.init()
  await hexo.watch()
  return hexo
}
