import { ADD_TOOLBAR_BUTTON_GENERATOR, SWITCH_ACTIVE_TABBAR_KEY } from '../types/app.type'
import { ARTICLE_TYPE } from 'utils/constants'

const defaultState = {
  activeTabbarKey: ARTICLE_TYPE.POST,
  generators: {
    toolbarButton: [],
  },
  tabs: [],
}

export default function app(state = defaultState, action: any) {
  switch (action.type) {
    case SWITCH_ACTIVE_TABBAR_KEY:
      return {
        ...state,
        activeTabbarKey: action.payload,
      }
    case ADD_TOOLBAR_BUTTON_GENERATOR:
      return {
        ...state,
        tabs: [...state.tabs, ...action.payload],
      }
    default:
      return state
  }
}
