import React from 'react'
import { Box } from '@material-ui/core'
import ReactMarkDown from 'react-markdown'

const Changelog: React.FC = () => {
  const input = '# Changelog'
  return (
    <Box>
      <ReactMarkDown source={input} />
    </Box>
  )
}

export default Changelog
