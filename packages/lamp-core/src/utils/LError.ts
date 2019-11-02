const errorCodeMap = {
  40001: '文件已存在',
}

export default class LError extends Error {
  constructor(code: number) {
    super(`${code}: ${errorCodeMap[code]}`)
  }
}
