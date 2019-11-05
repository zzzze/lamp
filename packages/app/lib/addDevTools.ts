import { BrowserWindow } from 'electron'
import * as glob from 'glob'
import * as path from 'path'
import * as os from 'os'

export default function addDevTools() {
  const devToolIds = [
    'fmkadmapgofadopljbjfkapdkoienihi', // react
    'lmhkpmbekcpmknklioeibfkpmmfibljd', // redux
  ]

  devToolIds.forEach(id => {
    const root = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions'
    )
    const result = glob.sync(`${id}/*`, {
      cwd: root,
    })
    if (Array.isArray(result) && result.length) {
      const devTool = path.join(root, result.pop())
      console.log('devTool', devTool)
      BrowserWindow.addDevToolsExtension(devTool)
    }
  }, [])
}
