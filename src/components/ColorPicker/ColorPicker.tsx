import React, { useState, useCallback, useEffect } from 'react'
import { Box, Grid, Typography, TextField } from '@material-ui/core'
import Color from 'color'
import {
  MaterialPicker,
  ChromePicker,
  SketchPicker,
  SwatchesPicker,
  HSLColor
} from 'react-color'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from '@material-ui/core/styles'
import materialColorSource from './color.json'
import CopyToClipboard from 'react-copy-to-clipboard'
import Message from 'utils/Message'
interface StyleProps {
  color: string
  opacity: number
}
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {
      '& .swatches-picker': {
        width: '100% !important',
        textAlign: 'center'
      }
    },
    link: {
      cursor: 'pointer',
      marginLeft: 8
    },
    bgBox: {
      width: 130,
      height: 130,
      background:
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center'
    },
    colorBox: {
      position: 'absolute',
      left: 8,
      top: 8,
      opacity: props => props.opacity,
      width: 130,
      height: 130,
      borderRadius: 2,
      boxShadow:
        'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
      backgroundColor: props => props.color
    },
    colorInput: {
      '& .MuiInput-underline:before': {
        borderBottomColor: props => props.color,
        borderBottomWidth: 2
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: props => props.color
      }
    },
    card: {
      boxSizing: 'border-box',
      padding: 16,
      width: 276,
      borderRadius: 2,
      boxShadow:
        'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px'
    }
  })
)

const ColorPicker: React.FC = () => {
  const theme = useTheme<Theme>()

  const [color, setColor] = useState<HSLColor | string>(
    Color(theme.palette.primary.main)
      .hsl()
      .toString()
  )
  useEffect(() => {
    let hslObj = Color(theme.palette.primary.main, 'hex')
      .hsl()
      .object()
    let { h, l, s } = hslObj
    setColor({ h: +h.toFixed(2), s: s / 100, l: l / 100, a: 1 })
  }, [theme])

  const handleColorChange = useCallback(() => {
    if (typeof color === 'string') {
      return { color, opacity: 1 }
    } else {
      const { h, s, l, a } = color
      return {
        color: {
          h: h.toFixed(0),
          s: s * 100,
          l: l * 100
        },
        opacity: a ?? 1
      }
    }
  }, [color])
  const classes = useStyles({
    color: Color(handleColorChange().color)
      .hex()
      .toString(),
    opacity: handleColorChange().opacity
  })

  const hex = Color(handleColorChange().color)
    .hex()
    .toString()
  const rgb = Color(handleColorChange().color)
    .alpha(handleColorChange().opacity)
    .rgb()
    .toString()
  const hsl = Color(handleColorChange().color)
    .alpha(handleColorChange().opacity)
    .hsl()
    .toString()
  let alpha = Math.round(255 * handleColorChange().opacity)
    .toString(16)
    .toUpperCase()
  if (alpha.length === 1) {
    alpha = 0 + alpha
  }
  const CSSHex = `${hex}${alpha}`
  const AndriodHex = `#${alpha}${hex.slice(1)}`
  return (
    <Box p={2}>
      <Grid container spacing={8} justify="center">
        <Grid item xs={12} md="auto">
          <Grid container spacing={2}>
            <Grid
              item
              style={{
                position: 'relative'
              }}>
              <Box className={classes.bgBox}></Box>
              <Box className={classes.colorBox} />
            </Grid>
            <Grid item>
              <MaterialPicker color={color} onChange={v => setColor(v.hsl)} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Box className={classes.card}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <CopyToClipboard
                      text={CSSHex}
                      onCopy={() => Message.success('CSS Hex color copied')}>
                      <TextField
                        value={CSSHex}
                        fullWidth
                        label="CSS Hex"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.colorInput}
                      />
                    </CopyToClipboard>
                  </Grid>
                  <Grid item xs={6}>
                    <CopyToClipboard
                      text={AndriodHex}
                      onCopy={() =>
                        Message.success('Andriod Hex color copied')
                      }>
                      <TextField
                        value={AndriodHex}
                        fullWidth
                        label="Andriod Hex"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.colorInput}
                      />
                    </CopyToClipboard>
                  </Grid>
                  <Grid item xs={12}>
                    <CopyToClipboard
                      text={rgb}
                      onCopy={() => Message.success('RGB color copied')}>
                      <TextField
                        value={rgb}
                        fullWidth
                        label="RGB"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.colorInput}
                      />
                    </CopyToClipboard>
                  </Grid>
                  <Grid item xs={12}>
                    <CopyToClipboard
                      text={hsl}
                      onCopy={() => Message.success('Hsl color copied')}>
                      <TextField
                        value={hsl}
                        fullWidth
                        label="HSL"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.colorInput}
                      />
                    </CopyToClipboard>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md="auto">
          <ChromePicker color={color} onChange={v => setColor(v.hsl)} />
        </Grid>
        <Grid item xs={12} md="auto">
          <SketchPicker color={color} onChange={v => setColor(v.hsl)} />
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <Typography variant="h5" align="center" gutterBottom>
            Material palette
            <a
              href="https://material.io/resources/color/"
              title="前往官方调色板页面">
              <Typography
                variant="subtitle2"
                component="span"
                color="primary"
                className={classes.link}>
                [官方调色板]
              </Typography>
            </a>
          </Typography>

          <SwatchesPicker
            color={color}
            height={390}
            onChange={v => setColor(v.hsl)}
            colors={materialColorSource}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ColorPicker
