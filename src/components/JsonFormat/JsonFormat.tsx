import React, { useState, useEffect } from 'react'

import {
  TextField,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Fade
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'

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

interface CreateLabelProps {
  k: number
  onClick?: () => void | undefined
}
const CreateLabel: React.FC<CreateLabelProps> = props => {
  const { k, onClick } = props
  const [active, setActive] = useState(false)

  const handleMouseEnter = (): void => setActive(true)
  const handleMouseLeave = (): void => setActive(false)

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      display="flex"
      alignItems="center"
      justifyContent="center">
      {'Tab ' + (k + 1)}
      <Fade in={active}>
        <Close
          style={{ paddingLeft: '8' }}
          fontSize="inherit"
          onClick={onClick}
        />
      </Fade>
    </Box>
  )
}
interface TabResult {
  uid: string
  k: number
}

const Page: React.FC = () => {
  const [value, setValue] = useState(0)
  const [tabArr, setTabArr] = useState<TabResult[]>([
    { uid: '1', k: 0 },
    { uid: '2', k: 1 },
    { uid: '3', k: 2 }
  ])
  const [pageNum, setPageNum] = useState(3)

  const removeTab = (uid: string) => {
    setTabArr(tabArr.filter(o => o.uid !== uid))
  }

  const createTab = (k: number): TabResult => {
    const uid = String(Math.random())
    return { uid, k }
  }

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setValue(newValue)
  }
  const handleAdd = (): void => {
    setTabArr([...tabArr, createTab(pageNum)])
    setPageNum(pageNum + 1)
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
        {tabArr.map((v, k) => (
          <Tab
            label={
              <CreateLabel k={v.k} key={k} onClick={() => removeTab(v.uid)} />
            }
            key={k}
            {...a11yProps(k)}
          />
        ))}
        <Tab icon={<Add />} onClick={handleAdd} />
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={(v: number): void => setValue(v)}>
        {tabArr.map((v, k) => (
          <Box mt={2} key={v.uid}>
            <JsonFormat />
          </Box>
        ))}
      </SwipeableViews>
    </>
  )
}

export default Page
