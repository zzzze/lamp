import {path as pathUtil} from '../utils'
import moveArticle from './moveArticle'

function publishArticle (_, fullSource: string) {
  if (pathUtil.isPostPath(fullSource)) return
  let slash = pathUtil.urlSlash()
  let dist = fullSource.replace(`${slash}_drafts${slash}`, `${slash}_posts${slash}`)
  return moveArticle(_, dist, fullSource)
}

export default publishArticle
