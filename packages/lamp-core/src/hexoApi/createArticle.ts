import * as fsEx from 'fs-extra'
import * as Hexo from 'hexo'
import * as path from 'path'
import { path as pathUtils, LError } from '../utils'
import withWatcher from './withWatcher'

function createArticle(hexo: Hexo, options: { slug?: string; title?: string }) {
  const projectPath = (hexo as any).env.blogPath
  const slug =
    options.slug ||
    encodeURI(options.title || '')
      .replace(/\W/g, '')
      .toLowerCase()
  const filepath = pathUtils.makePath(
    path.join(projectPath, `source/_drafts/${slug}.md`)
  )

  if (fsEx.existsSync(filepath)) {
    return new LError(40001)
  }

  return hexo.post.create(
    {
      layout: 'draft',
      slug,
      title: options.title || slug,
    },
    false
  )
}
export default withWatcher(createArticle)
