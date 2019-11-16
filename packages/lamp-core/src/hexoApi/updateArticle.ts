import * as Hexo from 'hexo'
import { IArticle } from './types'
import withWatcher from './withWatcher'

function updateArticle(hexo: Hexo, data: IArticle) {
  const article = {
    _content: data._content,
    date: data.date ? data.date._d : null,
    layout: data.source && data.source.startsWith('_posts') ? 'post' : 'draft',
    slug: data.slug,
    tags: data.tags,
    categories: data.categories,
    title: data.title,
  }
  return hexo.post.create(article, true)
}

export default withWatcher(updateArticle)
