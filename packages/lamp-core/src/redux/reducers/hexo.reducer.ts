import { FETCH_ARTICLE_DATA, FETCHING_ARTICLE } from 'redux/types/hexo.type'
import { DeepReadonly } from 'utility-types'

interface ArticleData {
  [key: string]: object
}

export type HexoState = DeepReadonly<{
  posts: (keyof ArticleData)[]
  drafts: (keyof ArticleData)[]
  data: ArticleData
  loading: boolean
}>

const defaultState: HexoState = {
  posts: [],
  drafts: [],
  data: {},
  loading: true,
}

export default function hexo(state = defaultState, action: any) {
  switch (action.type) {
    case FETCH_ARTICLE_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case FETCHING_ARTICLE:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
