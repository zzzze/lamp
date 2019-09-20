import * as Hexo from 'hexo'
import {IArticle, IArticleData} from './types'

export default function getArticleData (hexo: Hexo): IArticleData {
  const articles: IArticle[] = (hexo.locals.get('posts') as any).data
  const result: IArticleData = {
    data: {},
    drafts: [],
    posts: [],
  }
  articles.forEach((item: IArticle) => {
    result.data[item._id] = item
    if (/^_posts/.test(item.source)) {
      result.posts.push(item._id)
    } else {
      result.drafts.push(item._id)
    }
  })
  return result
}
