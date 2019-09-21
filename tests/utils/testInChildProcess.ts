import {ExecutionContext} from 'ava'
import * as shell from 'shelljs'

export default function testInChildProcess(t: ExecutionContext<null>, filepath: string) {
  let child = shell.exec('node_modules/.bin/ava ' + filepath)
  t.is(child.code, 0)
}
