import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import { useLocalStorageState } from 'ahooks'
import React, { useState } from 'react'

const Bark = () => {
  const [content, setContent] = useState('')
  const [barkUrl, setBarkUrl] = useLocalStorageState('barkURL', '')
  const [checked, setChecked] = useState(true)
  const msg = encodeURIComponent(content)

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const handleSend = () => {
    if (barkUrl && content) {
      fetch(`${barkUrl}/${msg}?automaticallyCopy=${+checked}&copy=${msg}`)
    }
  }

  return (
    <Box>
      <Typography variant="h5" align="center">
        {`${barkUrl}/${msg}?automaticallyCopy=${+checked}&copy=${msg}`}
      </Typography>
      <Box my={2}>
        <TextField
          value={barkUrl}
          onChange={e => setBarkUrl(e.target.value)}
          rows="6"
          rowsMax="12"
          fullWidth
          label="BarkURL"
        />
      </Box>
      <TextField
        value={content}
        onChange={e => setContent(e.target.value)}
        rows="6"
        rowsMax="12"
        fullWidth
        multiline
        label="Content"
        variant="outlined"
      />

      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="自动复制"
      />
      <Box>
        <Button color="primary" onClick={handleSend}>
          发送
        </Button>
      </Box>
    </Box>
  )
}

export default Bark
