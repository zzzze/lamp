import {path as pathUtil} from '../utils'
import moveArticle from './moveArticle'

function publishArticle(_, fullSource: string) {
  if (pathUtil.isPostPath(fullSource)) return
  const slash = pathUtil.urlSlash()
  const dist = fullSource.replace(`${slash}_drafts${slash}`, `${slash}_posts${slash}`)
  return moveArticle(_, dist, fullSource)
}

export default publishArticle
