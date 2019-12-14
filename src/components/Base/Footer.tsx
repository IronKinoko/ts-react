import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
const Footer: React.FC = () => {
  return (
    <Box className="app-footer">
      <Typography component="span">
        ©Copyright
        <Button
          color="primary"
          onClick={() => window.open('https://github.com/IronKinoko')}>
          kinoko
        </Button>
        {new Date().getFullYear()} |
      </Typography>
      <Link to="/changeLog">
        <Button color="primary">changeLog</Button>
      </Link>
    </Box>
  )
}

export default Footer
