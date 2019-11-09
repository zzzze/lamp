import * as Hexo from 'hexo'
import { IArticle, IArticleData } from './types'

export default function getArticleData(hexo: Hexo): IArticleData {
  const articles: IArticle[] = (hexo.locals.get('posts') as any).data
  const result: IArticleData = {
    data: {},
    drafts: [],
    posts: [],
  }
  articles.forEach((item: IArticle) => {
    const article = { ...item }
    if (article.tags && article.tags.length) {
      article.tags = (article.tags as any).data.map((tag: any) => tag.slug)
    }
    if (article.categories && article.categories.length) {
      article.categories = (article.categories as any).data.map((cate: any) => cate.slug)
    }
    result.data[article._id] = article
    if (article.source.startsWith('_posts')) {
      result.posts.push(article._id)
    } else {
      result.drafts.push(article._id)
    }
  })
  return result
}
