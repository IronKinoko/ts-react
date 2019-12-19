import React, { useRef, useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Slider
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import ColorPickerButton from '../Base/ColorPickerButton'
import './style.sass'
import JsBarcode from 'jsbarcode'
const modeArr = [
  { label: 'CODE128 auto', value: 'CODE128' },
  { label: 'CODE128 A', value: 'CODE128A' },
  { label: 'CODE128 B', value: 'CODE128B' },
  { label: 'CODE128 C', value: 'CODE128C' },
  { label: 'EAN13', value: 'EAN13' },
  { label: 'EAN8', value: 'EAN8' },
  { label: 'UPC', value: 'UPC' },
  { label: 'CODE39', value: 'CODE39' },
  { label: 'ITF14', value: 'ITF14' },
  { label: 'ITF', value: 'ITF' },
  { label: 'MSI', value: 'MSI' },
  { label: 'MSI10', value: 'MSI10' },
  { label: 'MSI11', value: 'MSI11' },
  { label: 'MSI1010', value: 'MSI1010' },
  { label: 'MSI1110', value: 'MSI1110' },
  { label: 'Pharmacode', value: 'pharmacode' }
]
const fontArr = [
  { label: 'Monospace', value: 'monospace' },
  { label: 'Sans-serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Cursive', value: 'cursive' }
]
const Barcode: React.FC = () => {
  const [options, setOptions] = useState<JsBarcode.Options>({
    width: 2,
    height: 100,
    format: 'CODE128',
    displayValue: true,
    fontOptions: '',
    font: 'monospace',
    text: undefined,
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    background: '#ffffff',
    lineColor: '#000000',
    margin: 10
  })
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState('Example 1234')
  const [helper, setHelper] = useState('')
  useEffect(() => {
    setHelper('')
    if (canvasElement.current) {
      try {
        JsBarcode(canvasElement.current, data, options)
      } catch (e) {
        setHelper('Not valid data for this barcode type!')
      }
    }
  }, [data, options])
  return (
    <Box className="barcode-wrap">
      <Paper className="root">
        <Grid container spacing={2} className="grid-container">
          <Grid item xs={12}>
            <Typography variant="h4" component="h5">
              Barcode Generator
            </Typography>
            <Typography variant="subtitle1">
              Real-time barcode generator.
            </Typography>
          </Grid>
          <Grid item xs={12} className="canvas">
            <Typography
              component="span"
              color="secondary"
              align="center"
              gutterBottom>
              {helper}
            </Typography>
            <canvas ref={canvasElement} hidden={helper !== ''}></canvas>
          </Grid>
          <Grid item xs={12} className="inline">
            <TextField
              placeholder="content"
              className="left"
              onChange={e => setData(e.target.value)}
              value={data}
            />
            <TextField
              select
              className="right"
              value={options.format}
              onChange={e =>
                setOptions({ ...options, format: e.target.value })
              }>
              {modeArr.map(o => (
                <MenuItem value={o.value} key={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Bar Width</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Slider
              value={options.width}
              onChange={(e, v) =>
                setOptions({ ...options, width: v as number })
              }
              step={1}
              max={4}
              min={1}
              defaultValue={2}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Height</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Slider
              value={options.height}
              onChange={(e, v) =>
                setOptions({ ...options, height: v as number })
              }
              step={5}
              max={150}
              min={10}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Margin</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Slider
              value={options.margin}
              onChange={(e, v) =>
                setOptions({ ...options, margin: v as number })
              }
              step={1}
              max={25}
              min={0}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Background</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <ColorPickerButton
              value={options.background}
              onChange={v => setOptions({ ...options, background: v.hex })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Line Color</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <ColorPickerButton
              value={options.lineColor}
              onChange={v => setOptions({ ...options, lineColor: v.hex })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Show Text</Typography>
          </Grid>
          <Grid item xs={12} sm={9} className="aligncenter">
            <ToggleButtonGroup
              size="small"
              exclusive
              value={options.displayValue}
              onChange={(e, v) => setOptions({ ...options, displayValue: v })}>
              <ToggleButton value={true}>Show</ToggleButton>
              <ToggleButton value={false}>Hide</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Text Align</Typography>
          </Grid>
          <Grid item xs={12} sm={9} className="aligncenter">
            <ToggleButtonGroup
              size="small"
              exclusive
              value={options.textAlign}
              onChange={(e, v) => setOptions({ ...options, textAlign: v })}>
              <ToggleButton value="left">left</ToggleButton>
              <ToggleButton value="center">center</ToggleButton>
              <ToggleButton value="right">right</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Font</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              select
              fullWidth
              value={options.font}
              onChange={e => setOptions({ ...options, font: e.target.value })}>
              {fontArr.map(o => (
                <MenuItem
                  value={o.value}
                  key={o.value}
                  style={{ fontFamily: o.value }}>
                  {o.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Font Options</Typography>
          </Grid>
          <Grid item xs={12} sm={9} className="aligncenter">
            <ToggleButtonGroup
              size="small"
              value={options.fontOptions?.split(' ')}
              onChange={(e, v) =>
                setOptions({ ...options, fontOptions: v.join(' ') })
              }>
              <ToggleButton value="bold" style={{ fontWeight: 'bold' }}>
                bold
              </ToggleButton>
              <ToggleButton value="italic" style={{ fontStyle: 'italic' }}>
                italic
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Font Size</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Slider
              value={options.fontSize}
              onChange={(e, v) =>
                setOptions({ ...options, fontSize: v as number })
              }
              step={1}
              max={36}
              min={8}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="label">Text Margin</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Slider
              value={options.textMargin}
              onChange={(e, v) =>
                setOptions({ ...options, textMargin: v as number })
              }
              step={1}
              max={40}
              min={-15}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Barcode
