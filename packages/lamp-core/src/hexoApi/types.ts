export interface IArticle {
  _id: string
  source: string
  full_source: string
  slug: string
  _content: string
  date: any
  tags: { length: number; data: ITag[] } | string[]
  categories: { length: number; data: ITag[] } | string[]
  title: string
}

interface ITag {
  slug: string
}

export interface IHexoInitOptions {
  debug?: boolean
  draft?: boolean
  silent?: boolean
}

export interface IArticleData {
  posts: string[]
  drafts: string[]
  data: {
    [key: string]: IArticle
  }
}
