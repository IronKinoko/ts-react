import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Message from 'utils/Message'
import { sanitize } from 'dompurify'
const colors = ['red', 'blue', 'gray']
const fontSize = [20, 30, 40]

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin:'8px 0',
    },
    span: {
      display: 'inline-block',
      margin: '0 8px',
      '& svg': {
        display: 'block',
      },
    },
  })
)

const SVGViewer = () => {
  const [content, setContent] = useState('')
  const classes = useStyles()

  const clean = sanitize(content)
  return (
    <Box pt={2} p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={content}
            onChange={e => setContent(e.target.value)}
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
              <CopyToClipboard
                text={content}
                onCopy={() => Message.success('copied')}>
                <Button>
                  <FileCopyIcon />
                </Button>
              </CopyToClipboard>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {colors.map((color, i) => (
            <div key={color} className={classes.root}>
              <span style={{ display: 'inline-block', width: 200 }}>
                color: {color} fontSize: {fontSize[i]}
              </span>
              <span
                className={classes.span}
                style={{
                  color,
                  fontSize: fontSize[i],
                }}
                dangerouslySetInnerHTML={{ __html: clean }}
              />
              <span
                className={classes.span}
                style={{
                  color,
                  fontSize: fontSize[i],
                  border: `1px dashed ${color}`,
                }}
                dangerouslySetInnerHTML={{ __html: clean }}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default SVGViewer
