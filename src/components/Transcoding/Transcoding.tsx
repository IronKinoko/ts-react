import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import Unicode from './Unicode'
import URLdecode from './URLdecode'
const Transcoding: React.FC = () => {
  const [value, setValue] = useState(0)
  return (
    <Box>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto">
        <Tab label="unicode转中文" />
        <Tab label="URL解码" />
        <Tab label="二维码识别" />
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={(v: number): void => setValue(v)}>
        <Unicode />
        <URLdecode />
      </SwipeableViews>
    </Box>
  )
}

export default Transcoding
