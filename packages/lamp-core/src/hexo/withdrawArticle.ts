import * as Hexo from 'hexo'
import {path as pathUtil} from '../utils'
import moveArticle from './moveArticle'

function withdrawArticle(_: Hexo, fullSource: string) {
  if (pathUtil.isDraftPath(fullSource)) return
  const slash = pathUtil.urlSlash()
  const dist = fullSource.replace(`${slash}_posts${slash}`, `${slash}_drafts${slash}`)
  return moveArticle(_, dist, fullSource)
}

export default withdrawArticle
