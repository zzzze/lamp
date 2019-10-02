import {path as pathUtil} from '../utils'
import moveArticle from './moveArticle'

function withdrawArticle (_, fullSource: string) {
  if (pathUtil.isDraftPath(fullSource)) return
  let slash = pathUtil.urlSlash()
  let dist = fullSource.replace(`${slash}_posts${slash}`, `${slash}_drafts${slash}`)
  return moveArticle(_, dist, fullSource)
}

export default withdrawArticle
