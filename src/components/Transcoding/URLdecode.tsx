import React, { useState } from 'react'
import { Box, TextField, Button, ButtonGroup } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CopyToClipboard from 'react-copy-to-clipboard'
import Message from 'utils/Message'
const URLdecode: React.FC = () => {
  const [url, setUrl] = useState('')

  const handleURLencode = () => {
    setUrl(encodeURIComponent(url))
  }
  const handleURLdecode = () => {
    setUrl(decodeURIComponent(url))
  }
  const handleReset = () => {
    setUrl('')
  }
  return (
    <Box pt={2} p={1}>
      <TextField
        value={url}
        onChange={e => setUrl(e.target.value)}
        rows="6"
        rowsMax="12"
        fullWidth
        placeholder="URL"
        multiline
        label="URL"
        variant="outlined"
      />

      <Box textAlign="right" pt={2}>
        <ButtonGroup color="primary">
          <Button style={{ whiteSpace: 'nowrap' }} onClick={handleURLencode}>
            URL编码
          </Button>

          <Button style={{ whiteSpace: 'nowrap' }} onClick={handleURLdecode}>
            URL解码
          </Button>
          <CopyToClipboard text={url} onCopy={() => Message.success('copied')}>
            <Button>
              <FileCopyIcon />
            </Button>
          </CopyToClipboard>
          <Button style={{ whiteSpace: 'nowrap' }} onClick={handleReset}>
            <ClearAllIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default URLdecode
