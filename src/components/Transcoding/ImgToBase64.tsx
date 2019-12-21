import React, { useState, useRef } from 'react'
import {
  Box,
  TextField,
  ButtonGroup,
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CopyToClipboard from 'react-copy-to-clipboard'
import filesize from 'filesize'
import Message from 'utils/Message'

function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString })
  return blob
}

interface ImgProps {
  fileSize: number
  fileType: string
  base64FileSize: number
}
const ImgToBase64: React.FC = () => {
  const inputElement = useRef<HTMLInputElement>(null)
  const imgElement = useRef<HTMLImageElement>(null)
  const [content, setContent] = useState('')
  const [imgProps, setImgProps] = useState<ImgProps>({
    fileSize: 0,
    base64FileSize: 0,
    fileType: ''
  })
  const handleReset = () => {
    setContent('')
    setImgProps({
      fileSize: 0,
      base64FileSize: 0,
      fileType: ''
    })
    if (imgElement.current) {
      imgElement.current.style.display = 'none'
      imgElement.current.src = ''
    }
  }
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const res = e.target?.result

      setImgProps(t => {
        return { ...t, base64FileSize: (res as string).length }
      })
      setContent(res as string)
      if (inputElement.current) {
        inputElement.current.value = ''
      }
    }
    const files = event.target.files
    if (files !== null) {
      const file = files[0]
      if (file === undefined) return
      if (!/image\/\w+/.test(file.type)) {
        alert('请确保文件为图像类型')
        return
      }
      setImgProps(t => {
        return { ...t, fileSize: file.size, fileType: file.type }
      })
      fileReader.readAsDataURL(file)
    }
  }
  const handleUploadFile = () => {
    inputElement?.current?.click()
  }

  const handleBase64ToImg = () => {
    if (imgElement?.current) {
      imgElement.current.src = content
      imgElement.current.style.display = 'block'
      let blob
      try {
        blob = dataURItoBlob(content)
      } catch (e) {
        blob = { type: '', size: 0 }
      }
      setImgProps({
        fileType: blob.type,
        fileSize: blob.size,
        base64FileSize: content.length
      })
    }
  }
  return (
    <Box pt={2} p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={3}>
          <TextField
            value={content.slice(0, 1000)}
            onChange={e => setContent(e.target.value)}
            rows="6"
            rowsMax="12"
            fullWidth
            placeholder="base64"
            variant="outlined"
            multiline
            label="base64"
            helperText={
              <Typography component="span" variant="subtitle2">
                出于浏览器性能考虑, 只显示的前1000字符,
                请点击下面的复制按钮获取全部内容
              </Typography>
            }
          />
          <Box pt={2} textAlign="right">
            <ButtonGroup color="primary">
              <Button onClick={handleUploadFile}>上传图片转成base64</Button>
              <Button onClick={handleBase64ToImg}>base64转成图片</Button>
              <CopyToClipboard
                text={content}
                onCopy={() => Message.success('copied')}>
                <Button>
                  <FileCopyIcon />
                </Button>
              </CopyToClipboard>
              <Button style={{ whiteSpace: 'nowrap' }} onClick={handleReset}>
                <ClearAllIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7} xl={9}>
          <Grid container style={{ marginBottom: 8 }}>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography component="span">
                图片格式: {imgProps.fileType}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={4}>
              <Typography component="span">
                图片大小: {filesize(imgProps.fileSize)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
              <Typography component="span">
                base64编码大小: {filesize(imgProps.base64FileSize)}
              </Typography>
            </Grid>
          </Grid>
          <Paper style={{ width: 'fit-content' }}>
            <img
              ref={imgElement}
              alt="img"
              style={{
                maxWidth: '100%',
                display: 'none'
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <input
        ref={inputElement}
        type="file"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    </Box>
  )
}

export default ImgToBase64
