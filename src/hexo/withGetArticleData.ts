import * as Hexo from 'hexo'
import getArticleData from './getArticleData'
import hexoInit from './hexoInit'
import {IArticleData} from './types'

export default function withGetArticleData(fn: any): (...args: any[]) => Promise<IArticleData> {
  return async (hexo: Hexo, ...args: any[]) => {
    fn(hexo, ...args)
    hexo = await hexoInit((hexo as any).env.blogPath, (hexo as any).env.args)
    return getArticleData(hexo)
  }
}
