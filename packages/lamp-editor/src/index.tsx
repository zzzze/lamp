import { constants } from '@lamp/shared'
import Editor from './components/Editor'

export const providers = {
  [constants.Provider.EDITOR]: Editor,
}
