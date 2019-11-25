import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import useMeasure from './helpers/useMeasure'
import { animated, useSpring } from 'react-spring'
import './style.sass'
const ChainAnimation: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [bind, { width }] = useMeasure()
  const props = useSpring({ width: open ? width : 0 })
  return (
    <Box {...bind} className="main" onClick={() => setOpen(!open)}>
      <animated.div className="fill" style={props}></animated.div>
      <animated.div className="content">
        {/* 
          // @ts-ignore */}
        {props.width.interpolate(x => x.toFixed(0))}
      </animated.div>
    </Box>
  )
}
export default ChainAnimation
