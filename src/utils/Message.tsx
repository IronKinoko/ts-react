import React from 'react'
import ReactDOM from 'react-dom'
import MessageSnackbar from 'components/Snackebar/Snackbar'
import { SnackbarContentProps } from '@material-ui/core'

interface SnackbarWrapProps extends Omit<SnackbarContentProps,'variant'> {
  duration: number
  variant: 'error' | 'success' | 'info' | 'warning'
}

class Message {
  private prevUid = ''
  private defaultConfig = {
    duration: 1500
  }
  private _appendMessageSnackbar(props: SnackbarWrapProps) {
    const uid = (Math.random() * 1000).toString(16)
    const { duration } = props
    let div = document.createElement('div')
    div.id = uid
    this._processQueue(uid)
    document.body.appendChild(div)
    ReactDOM.render(<MessageSnackbar {...props} />, div)
    setTimeout(() => {
      this._removeTarget(uid)
    }, duration + 1000)
  }
  private _processQueue(uid: string) {
    this._removeTarget(this.prevUid)
    this.prevUid = uid
  }

  private _removeTarget(uid: string) {
    let target = document.getElementById(uid)
    if (target) {
      document.body.removeChild(target)
    }
  }

  info(message: string, duration = this.defaultConfig.duration) {
    this._appendMessageSnackbar({ message, duration, variant: 'info' })
  }
  warning(message: string, duration = this.defaultConfig.duration) {
    this._appendMessageSnackbar({ message, duration, variant: 'warning' })
  }
  success(message: string, duration = this.defaultConfig.duration) {
    this._appendMessageSnackbar({ message, duration, variant: 'success' })
  }
  error(message: string, duration = this.defaultConfig.duration) {
    this._appendMessageSnackbar({ message, duration, variant: 'error' })
  }
}

export default new Message()
