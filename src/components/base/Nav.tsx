import React from 'react'

import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Icon
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Home from '@material-ui/icons/Home'
const Nav: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton href="/" edge="start" color="inherit" aria-label="home">
            <Home />
          </IconButton>
          <Typography component="h6">Web tools</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
