import * as fsEx from 'fs-extra'
import withWatcher from './withWatcher'
import {path as pathUtil} from '../utils'

function withdrawArticle (fullSource: string) {
  if (pathUtil.isPostPathPath(fullSource)) return
  let slash = pathUtil.urlSlash()
  let dist = fullSource.replace(`${slash}_posts${slash}`, `${slash}_drafts${slash}`)
  fsEx.moveSync(fullSource, dist)
}

export default withWatcher(publishArticle)
