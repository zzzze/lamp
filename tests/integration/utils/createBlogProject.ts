import * as fsEx from 'fs-extra'
import * as path from 'path'
import * as shell from 'shelljs'
import * as tar from 'tar'

export default function createBlogProject(blogPath: string, commands?: Array<string>) {
  fsEx.ensureDirSync(blogPath)
  fsEx.emptyDirSync(blogPath)
  tar.x({
    sync: true,
    file: path.resolve(__dirname, '../blog-template.tar.gz'),
    C: blogPath,
  })
  shell.cd(blogPath)
  if (process.env.CI) {
    shell.exec('rm ./package-lock.json')
    shell.exec('npm install')
  }
  if (Array.isArray(commands)) {
    commands.forEach(command => shell.exec(command))
  }
}
