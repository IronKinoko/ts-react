import React, { useState, useEffect } from 'react'
import {
  TextField,
  Typography,
  Box,
  Tabs,
  Tab,
  Fade,
  Slider,
  Button
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import FileCopy from '@material-ui/icons/FileCopyOutlined'
import CopyToClipboard from 'react-copy-to-clipboard'
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
  const [prettiy, setPrettiy] = useState('')
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
  const [value, setValue] = useState(0)
  const [tabSize, setTabSize] = useState(2)
  useEffect(() => {
    const res = format(jsonStr)
    setRes(res)
    setPrettiy(JSON.stringify(res, null, tabSize))
  }, [jsonStr, tabSize])

  return (
    <>
      <Typography variant="h5">JSON Format</Typography>
      <TextField
        label="JSON String"
        placeholder="input JSON String"
        multiline
        fullWidth
        rows="6"
        onChange={(e): void => {
          setJsonStr(e.target.value)
        }}
        rowsMax="10"
        margin="normal"
        error={errorMsg !== ''}
        helperText={errorMsg}
        inputProps={{
          style: { wordBreak: 'break-all' }
        }}
      />
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary">
        <Tab label="result" />
        <Tab label="pritty-print" />
      </Tabs>
      <SwipeableViews index={value} disabled>
        <Box p={1}>{errorMsg === '' && <JSONTree data={res} index={1} />}</Box>
        <Box p={2}>
          {errorMsg === '' && value === 1 && (
            <Box>
              <Typography gutterBottom>tabSize</Typography>
              <Slider
                value={tabSize}
                onChange={(e, v) => setTabSize(v as number)}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                style={{ width: 150, margin: '0 8px' }}
              />
              <CopyToClipboard text={prettiy}>
                <Button>
                  <FileCopy />
                  复制
                </Button>
              </CopyToClipboard>

              <Typography component="pre">{prettiy}</Typography>
            </Box>
          )}
        </Box>
      </SwipeableViews>
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
    <Box>
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
    </Box>
  )
}

export default Page
