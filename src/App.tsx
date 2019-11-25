import './App.sass'

import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Nav from './components/base/Nav'
import Home from './components/Home/Home'
import JsonFormat from './components/JsonFormat/JsonFormat'
import Test from './components/Test'
import Hook from './components/ReactHook/Hook'
import ReactSpring from './components/ReactSpring/ReactSpring'
const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Nav />
      <Box p={2} flex="1">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/test" component={Test}></Route>
          <Route path="/jsonFormat" component={JsonFormat}></Route>
          <Route path="/reactHook" component={Hook} />
          <Route path="/reactSpring" component={ReactSpring} />
          <Redirect to="/" />
        </Switch>
      </Box>
    </Box>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
