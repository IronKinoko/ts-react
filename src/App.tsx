import './App.sass'

import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Box from '@material-ui/core/Box'
import Nav from './components/base/Nav'
import Home from './components/Home/Home'
import JsonFormat from './components/JsonFormat/JsonFormat'
import Test from './components/Test'
import Hook from './components/ReactHook/Hook'
import ReactSpring from './components/ReactSpring/ReactSpring'

const actionsMap = { PUSH: 'forward', POP: 'back', REPLACE: '' }
const Routers = withRouter(({ location, history }) => (
  <TransitionGroup
    className="animated-wrap"
    childFactory={child =>
      React.cloneElement(child, { classNames: actionsMap[history.action] })
    }>
    <CSSTransition timeout={300} key={location.pathname}>
      <Switch location={location}>
        <Route path="/" exact component={Home} />
        <Route path="/test" component={Test} />
        <Route path="/jsonFormat" component={JsonFormat} />
        <Route path="/reactHook" component={Hook} />
        <Route path="/reactSpring" component={ReactSpring} />
        <Redirect to="/" />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
))

const App: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Box p={2} flex="1">
        <Routers />
      </Box>
    </Box>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
