import { FETCH_ARTICLE_DATA } from 'redux/types/hexo.type'
import { DeepReadonly } from 'utility-types'

interface ArticleData {
  [key: string]: object
}

export type HexoState = DeepReadonly<{
  posts: (keyof ArticleData)[]
  drafts: (keyof ArticleData)[]
  data: ArticleData
}>

const defaultState: HexoState = {
  posts: [],
  drafts: [],
  data: {},
}

export default function hexo(state = defaultState, action: any) {
  switch (action.type) {
    case FETCH_ARTICLE_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
