import * as fsEx from 'fs-extra'
import * as Hexo from 'hexo'
import {IArticle} from './types'
import renameFile from './renameFile'
import {path} from '../utils'
import withWatcher from './withWatcher'

function updateArticle(hexo: Hexo, newData: IArticle, oldData?: IArticle) {
  let slug = newData.slug
  if (oldData && newData.full_source !== oldData.full_source) {
    const fullSource = renameFile(newData.full_source)
    fsEx.moveSync(oldData.full_source, fullSource)
    const pathApartment = fullSource.split(path.urlSlash())
    slug = pathApartment.pop().replace('.md', '')
  }
  const article = {
    _content: newData._content,
    date: newData.date ? newData.date._d : null,
    layout: /^_posts/.test(newData.source) ? 'post' : 'draft',
    slug,
    tags: newData.tags,
    categories: newData.categories,
    title: newData.title,
  }
  return hexo.post.create(article, true)
}

export default withWatcher(updateArticle)
