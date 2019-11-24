import * as Hexo from 'hexo'
import { IHexoInitOptions } from './types'

const defaultOptions = {
  debug: false,
  draft: true,
  silent: true,
}
export default async function hexoInit(
  path: string,
  options?: IHexoInitOptions,
  loadMode: boolean = false
): Promise<Hexo> {
  options = {
    ...defaultOptions,
    ...(options || {}),
  }
  const hexo = new (Hexo as any)(path, options)
  ;(hexo.env as any).blogPath = path
  await hexo.init()
  if (loadMode) {
    await hexo.load()
  } else {
    await hexo.watch()
  }
  return hexo
}
