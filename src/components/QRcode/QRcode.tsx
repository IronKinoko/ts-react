import React from 'react'
import { Box } from '@material-ui/core'
import TabView from '../Base/TabView'

const RQcodeView: React.FC = () => {
  return (
    <TabView tabs={['二维码识别', '二维码生成']}>
      <Box />
    </TabView>
  )
}

export default RQcodeView
