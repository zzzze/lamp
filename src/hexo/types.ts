export interface IArticle {
  _id: string
  source: string
  full_source: string
}

export interface IHexoInitOptions {
  reload?: boolean
  debug?: boolean
  draft?: boolean
  silent?: boolean
}

export interface IArticleData {
  posts: string[]
  drafts: string[]
  data: {
    [key: string]: object,
  }
}
