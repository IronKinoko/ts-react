import './App.sass'

import React from 'react'
import { hot } from 'react-hot-loader/root'

import Box from '@material-ui/core/Box'
import Nav from './components/base/Nav'

const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Nav />
      <Box p={2} flex="1">
        {props.children}
      </Box>
    </Box>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
