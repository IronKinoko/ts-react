import './index.sass'
import 'typeface-roboto'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'

import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <App>
      <Route path="/" component={Home} />
    </App>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
