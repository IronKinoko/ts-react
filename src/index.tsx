import './index.sass'
import 'typeface-roboto'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue['700']
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)
