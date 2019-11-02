import {ADD_TOOLBAR_BUTTON_GENERATOR} from '../types/app.type'

const defaultState = {
  generators: {
    toolbarButton: [],
  },
  tabs: [],
}

export default function app(state = defaultState, action: any) {
  switch (action.type) {
  case ADD_TOOLBAR_BUTTON_GENERATOR:
    return {
      ...state,
      tabs: [
        ...state.tabs,
        ...action.payload,
      ],
    }
  default:
    return state
  }
}
