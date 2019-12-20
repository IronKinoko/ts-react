import React from 'react'
import { Box } from '@material-ui/core'
import ReactMarkDown from 'react-markdown'
import md from './Changelog.md'
const Changelog: React.FC = () => {
  return (
    <Box>
      <ReactMarkDown source={md} />
    </Box>
  )
}

export default Changelog
