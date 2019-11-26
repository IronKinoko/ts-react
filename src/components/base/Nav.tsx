import React from 'react'

import { AppBar, Typography, Toolbar, IconButton, Box } from '@material-ui/core'
import { Link as RouteLink, withRouter } from 'react-router-dom'

import Home from '@material-ui/icons/Home'
import Back from '@material-ui/icons/ArrowBack'
const Nav = withRouter(({ history }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => history.goBack()}>
            <Back />
          </IconButton>
          <RouteLink to="/">
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home />
            </IconButton>
          </RouteLink>
          <RouteLink to="/">
            <Typography component="h6">Web tools</Typography>
          </RouteLink>
          <Box flexGrow="1" />
        </Toolbar>
      </AppBar>
    </Box>
  )
})

export default Nav
