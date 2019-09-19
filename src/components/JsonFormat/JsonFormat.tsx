import React, { useState } from 'react'

import { TextField, Typography, Paper, Box } from '@material-ui/core'

import JSONTree from './JSONTree'

function recursion(res: any): any {
  for (const key in res) {
    if (res.hasOwnProperty(key)) {
      const value = res[key]
      try {
        if (
          typeof value === 'string' &&
          value.trim() !== '' &&
          (value.startsWith('[') || value.startsWith('{'))
        ) {
          res[key] = JSON.parse(value)
        }
        if (Array.isArray(res[key]) || typeof res[key] === 'object') {
          recursion(res[key])
        }
      } catch (error) {}
    }
  }
  return res
}

function format(jsonStr: string): any {
  try {
    const res: any = JSON.parse(jsonStr)
    return recursion(res)
  } catch (error) {}
}

const JsonFormat: React.FC = () => {
  const [jsonStr, setJsonStr] = useState('')
  const res: any = format(jsonStr)
  console.log(res)
  return (
    <>
      <Typography variant="h5">JSON字符串格式化</Typography>
      <TextField
        label="Multiline"
        placeholder="input JSON String"
        multiline
        fullWidth
        rows="6"
        onChange={(e): void => {
          setJsonStr(e.target.value)
          console.log(e.target.value)
        }}
        rowsMax="10"
        margin="normal"></TextField>
      <Typography variant="subtitle1">结果</Typography>
      <Paper>
        <Box p={1}>
          <JSONTree data={res} index={1} />
        </Box>
      </Paper>
    </>
  )
}

export default JsonFormat
