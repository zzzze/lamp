export function urlSlash(): '/' | '\\' {
  return process.platform === 'win32' ? '\\' : '/'
}
