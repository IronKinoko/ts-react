import React from 'react'
import Unicode from './Unicode'
import URLdecode from './URLdecode'
import TabView from '../Base/TabView'
import Base64 from './Base64'
import ImgToBase64 from './ImgToBase64'
const Transcoding: React.FC = () => {
  return (
    <TabView tabs={['unicode转中文', 'URL解码', 'base64解码', '图片转base64']}>
      <Unicode />
      <URLdecode />
      <Base64 />
      <ImgToBase64 />
    </TabView>
  )
}

export default Transcoding
