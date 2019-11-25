import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
interface BoundsProps {
  left: number
  top: number
  width: number
  height: number
}
export default function useMeasure(): [{ ref: any }, BoundsProps] {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    ro.observe(ref.current)
    return () => {
      ro.disconnect()
    }
  }, [ro])
  return [{ ref }, bounds]
}
