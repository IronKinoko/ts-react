import React, { useState } from 'react'
import { Box, TextField, ButtonGroup, Button } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'

const Base64: React.FC = () => {
  const [content, setContent] = useState('')
  const [help, setHelp] = useState('')
  const handleContentEncode = () => {
    try {
      setHelp('')
      setContent(btoa(unescape(encodeURIComponent(content))))
    } catch (e) {
      setHelp(e.message)
    }
  }
  const handleContentDecode = () => {
    try {
      setHelp('')
      setContent(decodeURIComponent(escape(atob(content))))
    } catch (e) {
      setHelp(e.message)
    }
  }
  const handleReset = () => {
    setContent('')
    setHelp('')
  }
  return (
    <Box pt={2} p={1}>
      <TextField
        value={content}
        onChange={e => {
          setContent(e.target.value)
          setHelp('')
        }}
        rows="6"
        rowsMax="12"
        fullWidth
        placeholder="content"
        multiline
        label="Input"
        variant="outlined"
        error={help !== ''}
        helperText={help}
      />

      <Box textAlign="right" pt={2}>
        <ButtonGroup color="primary">
          <Button
            style={{ whiteSpace: 'nowrap' }}
            onClick={handleContentEncode}>
            encode
          </Button>

          <Button
            style={{ whiteSpace: 'nowrap' }}
            onClick={handleContentDecode}>
            decode
          </Button>
          <Button style={{ whiteSpace: 'nowrap' }} onClick={handleReset}>
            <ClearAllIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default Base64
