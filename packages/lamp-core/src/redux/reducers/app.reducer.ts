import { remote } from 'electron'
import { SWITCH_ACTIVE_TABBAR_KEY, SET_PROJECT_ROOT, SET_THEME, TOGGLE_SNACKBAR } from '../types/app.type'
import { ARTICLE_TYPE } from '../../utils/constants'
import { constants } from '@lamp/shared'
import electronStore from '@lamp/shared/appStore'
import themeLight from '@lamp/shared/themes/theme-light'
import themeDark from '@lamp/shared/themes/theme-dark'

const { StoreKey } = constants
const getTheme = (themeType: string) => {
  themeType = themeType || electronStore.get(StoreKey.THEME)
  return themeType === 'dark' ? themeDark : themeLight
}

const defaultState = {
  activeTabbarKey: ARTICLE_TYPE.POST,
  projectRoot: electronStore.get(StoreKey.PROJECT_ROOT) || '',
  theme: getTheme(electronStore.get(StoreKey.THEME) || 'light'),
  snackbar: {
    open: false,
    message: '',
  },
}

export default function app(state = defaultState, action: any) {
  const theme = getTheme(action.payload)
  switch (action.type) {
    case SWITCH_ACTIVE_TABBAR_KEY:
      return {
        ...state,
        activeTabbarKey: action.payload,
      }
    case SET_PROJECT_ROOT:
      electronStore.set(StoreKey.PROJECT_ROOT, action.payload)
      return {
        ...state,
        projectRoot: action.payload,
      }
    case SET_THEME:
      electronStore.set(StoreKey.THEME, action.payload)
      remote.getCurrentWindow().setBackgroundColor(theme.palette.background.default)
      return {
        ...state,
        theme,
      }
    case TOGGLE_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      }
    default:
      return state
  }
}
