import './index.sass'
import 'typeface-roboto'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import serviceWorkerConfig from './serviceWorkerConfig'
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register(serviceWorkerConfig)
