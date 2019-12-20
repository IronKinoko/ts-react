import React, { useState, useCallback } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import Color from 'color'
import {
  MaterialPicker,
  ChromePicker,
  SketchPicker,
  SwatchesPicker,
  HSLColor
} from 'react-color'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import materialColorSource from './color.json'

const useStyles = makeStyles((theme: Theme) =>
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
    }
  })
)

const ColorPicker: React.FC = () => {
  const classes = useStyles()
  const [color, setColor] = useState<HSLColor | string>('#3F51B5')

  const handleColorChange = useCallback(() => {
    if (typeof color === 'string') {
      return { color, opacity: 1 }
    } else {
      const { h, s, l, a } = color
      return { color: { h, s: s * 100, l: l * 100 }, opacity: a }
    }
  }, [color])

  return (
    <Box p={2}>
      <Grid container spacing={8} justify="center">
        <Grid item xs={12} md="auto">
          <Grid container spacing={2}>
            <Grid item>
              <Box
                style={{
                  opacity: handleColorChange().opacity,
                  width: 130,
                  height: 130,
                  borderRadius: 2,
                  boxShadow:
                    'rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
                  backgroundColor: Color(handleColorChange().color)
                    .hex()
                    .toString()
                }}
              />
            </Grid>
            <Grid item>
              <MaterialPicker color={color} onChange={v => setColor(v.hsl)} />
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
