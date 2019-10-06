export function urlSlash(): '/' | '\\' {
  return process.platform === 'win32' ? '\\' : '/'
}

export function makePath(pathname: string): string {
  return process.platform === 'win32'
    ? pathname.replace(/\//g, '\\\\')
    : pathname.replace(/\\\\/g, '/')
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/\\\\/g, '/')
}

export function isSpecialArticle(pathname: string, type: string): boolean {
  pathname = normalizePath(pathname)
  let pattern = new RegExp(`/source/_${type}s/.+\\.md$`)
  return pattern.test(pathname)
}

export function isDraftPath(pathname: string): boolean {
  return isSpecialArticle(pathname, 'draft')
}

export function isPostPath(pathname: string): boolean {
  return isSpecialArticle(pathname, 'post')
}
