import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import {
  MaterialPicker,
  ChromePicker,
  SketchPicker,
  SwatchesPicker
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
  const [color, setColor] = useState('#2af')
  return (
    <Box p={2}>
      <Grid container spacing={8} justify="center">
        <Grid item xs={12} md="auto">
          <MaterialPicker color={color} onChange={v => setColor(v.hex)} />
        </Grid>
        <Grid item xs={12} md="auto">
          <ChromePicker color={color} onChange={v => setColor(v.hex)} />
        </Grid>
        <Grid item xs={12} md="auto">
          <SketchPicker color={color} onChange={v => setColor(v.hex)} />
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
            onChange={v => setColor(v.hex)}
            colors={materialColorSource}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ColorPicker
