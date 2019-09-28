import * as fsEx from 'fs-extra'
import withWatcher from './withWatcher'
import {path as pathUtil} from '../utils'

function publishArticle (fullSource: string) {
  if (pathUtil.isDraftPath(fullSource)) return
  let slash = pathUtil.urlSlash()
  let dist = fullSource.replace(`${slash}_drafts${slash}`, `${slash}_posts${slash}`)
  fsEx.moveSync(fullSource, dist)
}

export default withWatcher(publishArticle)
