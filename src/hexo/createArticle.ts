import * as Hexo from 'hexo'
import {ActionResult} from './types'

export default function createArticle (hexo: Hexo, slug: string): ActionResult {
  try {
    hexo.post.create({
      layout: 'draft',
      slug,
      title: slug,
    }, false)
    return ActionResult.SUCCESS
  } catch (err) {
    console.error(err)
    return ActionResult.FAILURE
  }
}
