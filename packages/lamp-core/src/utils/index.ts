import * as path from './path'
export { path }
export { default as LError } from './LError'
export { default as renameFile } from './renameFile'

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))
export { sleep }
