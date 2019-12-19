import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { ChromePicker, ColorResult } from 'react-color'
function hexToRGBArray(color: string) {
  color = color.slice(1)
  if (color.length === 3)
    color =
      color.charAt(0) +
      color.charAt(0) +
      color.charAt(1) +
      color.charAt(1) +
      color.charAt(2) +
      color.charAt(2)

  const rgb = []
  for (let i = 0; i <= 2; i++) rgb[i] = parseInt(color.substr(i * 2, 2), 16)
  return rgb
}
function luma(color: string) {
  // color can be a hx string or an array of RGB values 0-255
  const rgb = typeof color === 'string' ? hexToRGBArray(color) : color
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] // SMPTE C, Rec. 709 weightings
}
function contrastingColor(color = '#fff') {
  return luma(color) >= 165 ? '#000' : '#fff'
}
interface ColorPickerButtonProps {
  value: string | undefined
  onChange: (v: ColorResult) => void
}
const ColorPickerButton: React.FC<ColorPickerButtonProps> = props => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        style={{
          background: props.value,
          color: contrastingColor(props.value)
        }}
        fullWidth
        onClick={() => setOpen(true)}>
        {props.value}
      </Button>
      <Box hidden={!open}>
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="99"
          onClick={() => setOpen(false)}
        />
        <Box position="absolute" zIndex="100">
          <ChromePicker color={props.value} onChange={v => props.onChange(v)} />
        </Box>
      </Box>
    </>
  )
}

export default ColorPickerButton
