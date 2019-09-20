import * as path from 'path'
import * as shell from 'shelljs'

export default function createPost(blogPath: string, postName: string, postType: string = 'post') {
  shell.cp(path.resolve(__dirname, '../posts', `${postName}.md`), path.join(blogPath, `source/_${postType}s/${postName}.md`))
}
