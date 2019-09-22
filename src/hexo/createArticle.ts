import * as fsEx from 'fs-extra'
import * as path from 'path'
import {path as pathUtils, LError} from '../utils'
import withWatcher from './withWatcher'

function createArticle (hexo, options: {slug?: string, title?: string}) {
  let projectPath = hexo.env.blogPath
  let slug = options.slug || encodeURI(options.title).replace(/\W/g, '').toLowerCase()
  let filepath = pathUtils.makePath(path.join(projectPath, `source/_drafts/${slug}.md`))

  if (fsEx.existsSync(filepath)) {
    return new LError(40001)
  }

  hexo.post.create({
    layout: 'draft',
    slug,
    title: options.title || slug,
  }, false)
}
export default withWatcher(createArticle)
