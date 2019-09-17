import React from 'react'

import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core'
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
