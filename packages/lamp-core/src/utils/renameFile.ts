import * as fsEx from 'fs-extra'

export default function renameFile(name: string): string {
  while (fsEx.pathExistsSync(name)) {
    const result = name.match(/^(.*-)(\d*)\.md$/)
    let newName = ''
    if (result) {
      const num = parseInt(result[2], 10)
      newName = result[1] + (num + 1) + '.md'
    } else {
      newName = name.replace(/\.md$/, '-1.md')
    }
    name = newName
  }
  return name
}
