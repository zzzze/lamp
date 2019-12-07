import * as Hexo from 'hexo'
import * as electron from 'electron'
import withWatcher from './withWatcher'

function deleteArticle(_: Hexo, fullSource: string) {
  electron.shell.moveItemToTrash(fullSource)
}

export default withWatcher(deleteArticle)
