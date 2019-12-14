import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'

interface TabViewProps {
  tabs: string[]
  children: React.ReactNode
  value?: any
  onChange?: ((event: React.ChangeEvent<{}>, value: any) => void) | undefined
  swipeDisabled?: boolean | undefined
}
const TabView: React.FC<TabViewProps> = props => {
  const [value, setValue] = useState(0)
  return (
    <Box>
      <Tabs
        value={props.value === undefined ? value : props.value}
        onChange={(e, v) => {
          setValue(v)
          props.onChange && props.onChange(e, v)
        }}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto">
        {props.tabs.map(name => (
          <Tab label={name} key={name} />
        ))}
      </Tabs>
      <SwipeableViews
        index={props.value === undefined ? value : props.value}
        onChangeIndex={(v: number): void => setValue(v)}
        disabled={props.swipeDisabled}>
        {props.children}
      </SwipeableViews>
    </Box>
  )
}

export default TabView
