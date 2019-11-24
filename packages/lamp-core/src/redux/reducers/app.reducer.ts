import { ADD_TOOLBAR_BUTTON_GENERATOR, SWITCH_ACTIVE_TABBAR_KEY, SET_PROJECT_ROOT, SET_THEME } from '../types/app.type'
import ElectronStore from 'electron-store'
import { ARTICLE_TYPE } from 'utils/constants'

const electronStore = new ElectronStore()

enum StoreKey {
  PROJECT_ROOT = 'PROJECT_ROOT',
}

const defaultState = {
  activeTabbarKey: ARTICLE_TYPE.POST,
  projectRoot: electronStore.get(StoreKey.PROJECT_ROOT) || '',
  generators: {
    toolbarButton: [],
  },
  tabs: [],
  theme: 'light',
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
    case SET_PROJECT_ROOT:
      electronStore.set(StoreKey.PROJECT_ROOT, action.payload)
      return {
        ...state,
        projectRoot: action.payload,
      }
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}
