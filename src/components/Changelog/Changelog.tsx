import React from 'react'
import { Box, Button } from '@material-ui/core'
import ReactMarkDown from 'react-markdown'

const Changelog: React.FC = () => {
  const input = '# Changelog'
  return (
    <Box>
      <ReactMarkDown source={input} />
      <Button />
    </Box>
  )
}

export default Changelog
