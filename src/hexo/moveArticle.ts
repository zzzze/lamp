import * as fsEx from 'fs-extra'
import * as Hexo from 'hexo'
import renameFile from './renameFile'
import withWatcher from './withWatcher'

function moveArticle(_: Hexo, newFullSource: string, oldFullSource: string) {
  if (newFullSource !== oldFullSource) {
    const fullSource = renameFile(newFullSource)
    fsEx.moveSync(oldFullSource, fullSource)
  }
}

export default withWatcher(moveArticle)
