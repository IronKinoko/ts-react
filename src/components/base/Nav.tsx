import React from 'react'

import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
  Button
} from '@material-ui/core'
import { Link as RouteLink } from 'react-router-dom'

import Home from '@material-ui/icons/Home'
const Nav: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <RouteLink to="/">
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home />
            </IconButton>
          </RouteLink>
          <Typography component="h6">Web tools</Typography>
          <Box flexGrow="1" />
          <RouteLink to="/">
            <Button variant="text" color="inherit">
              HOME
            </Button>
          </RouteLink>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
