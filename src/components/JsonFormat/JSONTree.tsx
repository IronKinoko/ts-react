import React from 'react'

import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Typography, Box } from '@material-ui/core'
type propsType = {
  children?: React.ReactNode
  data: any
  index: number
}

const style = {
  label: {
    color: '#aa00aa'
  },
  value: {
    color: '#c41a16'
  },
  primary: {
    color: '#2a00ff'
  },
  gray: {
    color: '#b7b7b7'
  }
}

function S4(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function guid(): string {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

function renderTree(props: propsType): JSX.Element[] | undefined {
  if (!props.data) {
    return
  }
  const arr: JSX.Element[] = []
  let i = 0
  for (const key in props.data) {
    if (props.data.hasOwnProperty(key)) {
      const element = props.data[key]
      if (Array.isArray(element)) {
        arr.push(
          <TreeItem
            key={Math.random()}
            nodeId={guid()}
            label={<ArrayComp label={key} length={element.length} />}>
            <JSONTree data={element} index={props.index + 1} />
          </TreeItem>
        )
      } else if (
        typeof element == 'string' ||
        typeof element == 'number' ||
        typeof element === 'boolean' ||
        element === null
      ) {
        arr.push(
          <TreeItem
            key={Math.random()}
            nodeId={guid()}
            label={<StringComp label={key} value={element} />}
          />
        )
      } else if (typeof element == 'object') {
        arr.push(
          <TreeItem
            key={Math.random()}
            nodeId={guid()}
            label={<ObjectComp index={i} label={key} />}>
            <JSONTree data={element} index={props.index + 1} />
          </TreeItem>
        )
        i++
      }
    }
  }
  return arr
}

type ArrayProps = {
  children?: React.ReactNode
  label: string
  length: number
}
const ArrayComp: React.FC<ArrayProps> = props => {
  return (
    <>
      <Typography component="span" style={style.label}>
        {props.label}
      </Typography>
      <Typography component="span">: </Typography>
      <Typography component="span">Array({props.length})</Typography>
    </>
  )
}

type StringProps = {
  children?: React.ReactNode
  label: string
  value: string | number | boolean
}
const StringComp: React.FC<StringProps> = props => {
  return (
    <>
      <Typography component="span" style={style.label}>
        {props.label}
      </Typography>
      <Typography component="span">：</Typography>
      {typeof props.value === 'string' ? (
        <>
          "
          <Typography component="span" style={style.value}>
            {props.value}
          </Typography>
          "
        </>
      ) : props.value === null ? (
        <Typography component="span" style={style.gray}>
          {JSON.stringify(props.value)}
        </Typography>
      ) : (
        <Typography component="span" style={style.primary}>
          {JSON.stringify(props.value)}
        </Typography>
      )}
    </>
  )
}

type ObjectProps = {
  children?: React.ReactNode
  index: number
  label: string
}
const ObjectComp: React.FC<ObjectProps> = props => {
  return (
    <>
      <Typography component="span">
        <Typography component="span" style={style.label}>
          {props.label || props.index}
        </Typography>
        : object
      </Typography>
    </>
  )
}

const JSONTree: React.FC<propsType> = (props: propsType) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<Box style={{ width: 24 }} />}>
      {renderTree(props)}
    </TreeView>
  )
}

export default JSONTree
