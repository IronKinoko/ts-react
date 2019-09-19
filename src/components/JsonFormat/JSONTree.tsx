import React from 'react'

import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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
      } else if (typeof element == 'string' || typeof element == 'number') {
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
            label={<ObjectComp index={i} />}>
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
      <span style={style.label}>{props.label}</span>
      <span>: </span>
      <span>Array({props.length})</span>
    </>
  )
}

type StringProps = {
  children?: React.ReactNode
  label: string
  value: string | React.ReactText
}
const StringComp: React.FC<StringProps> = props => {
  return (
    <>
      <span style={style.label}>{props.label}</span>
      <span>: </span>
      {typeof props.value === 'string' ? (
        <span>
          "<span style={style.value}>{props.value}</span>"
        </span>
      ) : (
        <span style={style.primary}>{props.value}</span>
      )}
    </>
  )
}

type ObjectProps = {
  children?: React.ReactNode
  index: number
}
const ObjectComp: React.FC<ObjectProps> = props => {
  return (
    <>
      <span>
        <span style={style.label}>{props.index}</span>: object
      </span>
    </>
  )
}

const JSONTree: React.FC<propsType> = (props: propsType) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}>
      {renderTree(props)}
    </TreeView>
  )
}

export default JSONTree
