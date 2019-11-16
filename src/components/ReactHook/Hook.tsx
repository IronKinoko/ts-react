import React, { useState } from 'react'

import {
  Button,
  Box,
  Typography,
  Paper,
  ButtonGroup,
  Fade
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import Refresh from '@material-ui/icons/Refresh'
import Clear from '@material-ui/icons/Clear'
interface ChildProps {
  k: number
  log: () => void
}
const Child: React.FC<ChildProps> = props => {
  const { k, log } = props
  return (
    <Fade in mountOnEnter unmountOnExit>
      <Box m={1}>
        <Button variant="outlined" color="primary" key={k} onClick={log}>
          {'log' + k}
        </Button>
      </Box>
    </Fade>
  )
}
const Hook: React.FC = () => {
  const [list, setList] = useState<JSX.Element[]>([])

  const log = () => console.log(list)

  const add = () =>
    setList([
      ...list,
      <Child k={Math.random()} key={Math.random()} log={log} />
    ])

  const remove = () => setList(list.slice(0, -1))
  const reset = () => setList([])
  const refresh = () => setList([...list])
  return (
    <>
      <Box m={1} display="inline-block">
        <ButtonGroup variant="outlined" color="primary">
          <Button onClick={add}>
            <Add />
          </Button>
          <Button onClick={remove}>
            <Remove />
          </Button>
          <Button onClick={refresh}>
            <Refresh />
          </Button>
          <Button onClick={reset}>
            <Clear />
          </Button>
        </ButtonGroup>
      </Box>
      <Paper>
        <Box p="24px 16px" mb={2}>
          <Typography variant="subtitle1" component="p">
            {`左边是一个子组件数组 list.map((v, k) => v) 其中 v 是 setList([...list, <Child k={Math.random()} key={Math.random()} log={log} />])`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`右边是map输出的数组 list.map((v, k) => <Child k={Math.random()} key={Math.random()} log={log} />)`}
          </Typography>
          <Typography component="p">他们打印出来的log不一样</Typography>
        </Box>
      </Paper>
      <Box display="flex">
        <Box flex="1" p={1} borderRight="1px solid #000">
          {list.map((v, k) => v)}
        </Box>
        <Box flex="1" p={1}>
          {list.map((v, k) => (
            <Child k={Math.random()} key={k} log={log} />
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Hook
