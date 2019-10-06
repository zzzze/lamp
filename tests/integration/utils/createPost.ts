import * as path from 'path'
import * as shell from 'shelljs'
import * as fsEx from 'fs-extra'

export default function createPost(blogPath: string, postName: string, postType: string = 'post') {
  let postPath = path.join(blogPath, `source/_${postType}s`)
  fsEx.ensureDirSync(postPath)
  shell.cp(path.resolve(__dirname, '../posts', `${postName}.md`), path.join(postPath, `/${postName}.md`))
}
