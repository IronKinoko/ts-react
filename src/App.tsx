import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Box from '@material-ui/core/Box'
import Nav from './components/Nav/Nav'

import './App.sass'
import { CircularProgress } from '@material-ui/core'

const Home = React.lazy(() =>
  import(/* webpackChunkName: 'Home'*/ './components/Home/Home')
)
const JsonFormat = React.lazy(() =>
  import(
    /* webpackChunkName: 'JsonFormat'*/ './components/JsonFormat/JsonFormat'
  )
)
const Test = React.lazy(() =>
  import(/* webpackChunkName: 'Test'*/ './components/Test')
)
const Hook = React.lazy(() =>
  import(/* webpackChunkName: 'Hook'*/ './components/ReactHook/Hook')
)
const ReactSpring = React.lazy(() =>
  import(
    /* webpackChunkName: 'ReactSpring'*/ './components/ReactSpring/ReactSpring'
  )
)
const Transcoding = React.lazy(() =>
  import(
    /* webpackChunkName: 'Transcoding'*/ './components/Transcoding/Transcoding'
  )
)
const actionsMap = { PUSH: 'forward', POP: 'back', REPLACE: '' }
const Routers = withRouter(({ location, history }) => (
  <TransitionGroup
    className="animated-wrap"
    childFactory={child =>
      React.cloneElement(child, { classNames: actionsMap[history.action] })
    }>
    <CSSTransition timeout={300} key={location.pathname}>
      <Suspense fallback={<CircularProgress />}>
        <Switch location={location}>
          <Route path="/" exact component={Home} />
          <Route path="/test" component={Test} />
          <Route path="/jsonFormat" component={JsonFormat} />
          <Route path="/reactHook" component={Hook} />
          <Route path="/reactSpring" component={ReactSpring} />
          <Route path="/transcoding" component={Transcoding} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </CSSTransition>
  </TransitionGroup>
))

const App: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Box p={2}>
        <Routers />
      </Box>
    </Box>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
