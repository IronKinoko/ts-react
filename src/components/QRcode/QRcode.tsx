import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Box,
  TextField,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  Backdrop,
  Typography
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRcode from 'qrcode.react'
import qrcode from '../../plugin/reqrcode'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'fit-content'
    },
    backDrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  })
)

const getObjectURL = function(file: File) {
  let url = null
  if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

const QRcodeWarp: React.FC = () => {
  const classes = useStyles()
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)
  const inputElement = useRef<HTMLInputElement>(null)
  const backDropElement = useRef<HTMLDivElement>(null)

  const handleDecodeQRcode = () => {
    inputElement?.current?.click()
  }

  const decodeFile = (file: File) => {
    if (file === undefined) return
    qrcode.decode(getObjectURL(file))
    qrcode.callback = function(str: string) {
      str = decodeURI(escape(str))
      setContent(str)
    }
    if (inputElement.current) {
      inputElement.current.value = ''
    }
  }
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files !== null) {
      const file = files[0]
      decodeFile(file)
    }
  }

  const handleReset = () => {
    setContent('')
  }
  const handleContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value)
  }
  const handleDrop = useCallback((e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(false)
    if (e === null) return
    if (e?.dataTransfer?.files) {
      const files = e.dataTransfer.files
      if (files.length === 0) return
      const file = files[0]
      decodeFile(file)
    }
  }, [])
  const handleDragStart = useCallback((e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(true)
  }, [])
  const handleDragOver = useCallback((e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }, [])

  useEffect(() => {
    if (backDropElement.current) {
      backDropElement.current.addEventListener('drop', handleDrop)
      document.addEventListener('dragenter', handleDragStart)
      document.addEventListener('dragover', handleDragOver)
    }

    return () => {
      document.removeEventListener('dragenter', handleDragStart)
      document.removeEventListener('dragover', handleDragOver)
    }
  }, [handleDrop, handleDragStart, handleDragOver])

  return (
    <Box pt={2} p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={3}>
          <TextField
            value={content}
            onChange={handleContent}
            rows="6"
            rowsMax="12"
            fullWidth
            placeholder="可拖入文件"
            multiline
            label="Input"
            variant="outlined"
          />
          <Box textAlign="right" pt={2}>
            <ButtonGroup color="primary">
              <Button onClick={handleDecodeQRcode}>解析二维码</Button>
              <CopyToClipboard text={content}>
                <Button>
                  <FileCopyIcon />
                </Button>
              </CopyToClipboard>
              <Button onClick={handleReset}>
                <ClearAllIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7} xl={9}>
          <Paper className={classes.root}>
            <QRcode value={content || 'empty'} size={300} />
          </Paper>
        </Grid>
      </Grid>
      <Backdrop open={open} className={classes.backDrop} ref={backDropElement}>
        <Typography color="inherit">松开解析图片</Typography>
      </Backdrop>
      <input
        ref={inputElement}
        type="file"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    </Box>
  )
}

export default QRcodeWarp
