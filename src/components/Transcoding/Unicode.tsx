import React, { useState } from 'react'
import { Box, TextField, Button, ButtonGroup, Grid } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'
function toUnicodeFun(data: string): string {
  if (data === '' || typeof data === 'undefined') return ''
  let str = ''
  for (let i = 0; i < data.length; i++) {
    str += '\\u' + data.charCodeAt(i).toString(16)
  }
  return str
}

const Unicode: React.FC = () => {
  const [origin, setOrigin] = useState('')
  const [unicode, setUnicode] = useState('')

  const handleChineseToUnicode = () => {
    setUnicode(toUnicodeFun(origin))
  }
  const handleUnicodeToChinese = () => {
    setOrigin(unescape(unicode.replace(/\\u/g, '%u')))
  }
  const handleReset = () => {
    setUnicode('')
    setOrigin('')
  }
  return (
    <Box pt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            rows="6"
            rowsMax="12"
            fullWidth
            placeholder="请输入中文"
            multiline
            label="中文"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={unicode}
            onChange={e => setUnicode(e.target.value)}
            rows="6"
            rowsMax="12"
            fullWidth
            multiline
            label="unicode"
            placeholder="请输入unicode"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box textAlign="right" pt={2}>
        <ButtonGroup color="primary">
          <Button
            style={{ whiteSpace: 'nowrap' }}
            onClick={handleChineseToUnicode}>
            中文转unicode
          </Button>

          <Button
            style={{ whiteSpace: 'nowrap' }}
            onClick={handleUnicodeToChinese}>
            Unicode转中文
          </Button>
          <Button style={{ whiteSpace: 'nowrap' }} onClick={handleReset}>
            <ClearAllIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default Unicode
