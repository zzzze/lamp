import * as Hexo from 'hexo'
import getArticleData from './getArticleData'
import { IArticleData } from './types'

export default function withGetArticleData(fn: any): (...args: any[]) => Promise<IArticleData> {
  return async (hexo: Hexo, ...args: any[]) => {
    await fn(hexo, ...args)
    return getArticleData(hexo)
  }
}
