import * as fsEx from 'fs-extra'
import * as path from 'path'
import {path as pathUtils, LError} from '../utils'

export default function createArticle (hexo, slug: string, title?: string) {
  let projectPath = hexo._path
  let filepath = pathUtils.makePath(path.join(projectPath, `source/_drafts/${slug}.md`))
  console.log(filepath)
  if (fsEx.existsSync(filepath)) {
    return new LError(40001)
  }

  hexo.post.create({
    layout: 'draft',
    slug,
    title: title || slug,
  }, false)
}
