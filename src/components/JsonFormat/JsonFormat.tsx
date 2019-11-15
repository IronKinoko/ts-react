import React, { useState, useEffect } from 'react'

import { TextField, Typography, Paper, Box, Tabs, Tab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
// import Add from '@material-ui/icons/Add'
import JSONTree from './JSONTree'

function recursion(res: any): any {
  for (const key in res) {
    if (res.hasOwnProperty(key)) {
      const value = res[key]
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
    }
  }
  return res
}

const JsonFormat: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const format = (jsonStr: string): any => {
    try {
      if (jsonStr !== '') {
        setErrorMsg('')
        const res: any = JSON.parse(jsonStr)
        console.log(res)
        return recursion(res)
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  const [jsonStr, setJsonStr] = useState('')
  const [res, setRes] = useState(() => format(jsonStr))

  useEffect(() => {
    setRes(() => format(jsonStr))
  }, [jsonStr])

  return (
    <>
      <Typography variant="h5">JSON Format</Typography>
      <TextField
        label="Multiline"
        placeholder="input JSON String"
        multiline
        fullWidth
        rows="6"
        onChange={(e): void => {
          setJsonStr(e.target.value)
        }}
        rowsMax="10"
        margin="normal"></TextField>
      <Typography variant="subtitle1">Result</Typography>
      <Paper>
        <Box p={1}>
          {errorMsg ? errorMsg : <JSONTree data={res} index={1} />}
        </Box>
      </Paper>
    </>
  )
}

function a11yProps(index: any): any {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Page: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setValue(newValue)
  }
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto">
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        {/* <Tab icon={<Add />} /> */}
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={(v): void => setValue(v)}>
        <Box mt={2}>
          <JsonFormat />
        </Box>
        <Box mt={2}>
          <JsonFormat />
        </Box>
        <Box mt={2}>
          <JsonFormat />
        </Box>
      </SwipeableViews>
    </>
  )
}

export default Page
