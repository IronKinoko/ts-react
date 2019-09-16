import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Typography, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const Nav: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h6">Web tools</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
