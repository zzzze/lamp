import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    type: 'light',
    common: {
      black: 'rgba(51, 51, 51, 1)',
      white: '#fff',
    },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(255, 255, 255, 1)',
    },
    primary: {
      light: 'rgba(255, 213, 88, 1)',
      main: 'rgba(255, 193, 7, 1)',
      dark: 'rgba(255, 160, 0, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(71, 195, 252, 1)',
      main: 'rgba(0, 177, 245, 1)',
      dark: 'rgba(30, 112, 182, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(51, 51, 51, 1)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    divider: '#BDBDBD',
  },
})
