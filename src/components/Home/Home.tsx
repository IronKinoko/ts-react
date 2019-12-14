import React, { useState } from 'react'
import { Grid, Button, TextField, Box } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Link as RouteLink } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './style.sass'
interface RouteData {
  path: string
  name: string
  in: boolean
  keyWords: string
}

const mainPageRouter: RouteData[] = [
  { path: '/jsonFormat', name: 'JSON格式化', in: true, keyWords: 'json' },
  { path: '/test', name: '测试专用', in: true, keyWords: '' },
  { path: '/reactHook', name: 'React Hook', in: true, keyWords: '' },
  { path: './reactSpring', name: 'React Spring', in: true, keyWords: '' },
  {
    path: './transcoding',
    name: '转码',
    in: true,
    keyWords: 'unicode base64 url'
  },
  { path: './qrcode', name: '二维码工具', in: true, keyWords: 'qrcode' }
]

const Home: React.FC = () => {
  const [filter, setFilter] = useState('')
  const filterMainPageRouter = mainPageRouter.map((item: RouteData) => {
    const newItem = { ...item }
    if (
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.path.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.keyWords.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
      newItem.in = true
    else newItem.in = false
    return newItem
  })
  const emptyResult = filterMainPageRouter.every(o => o.in === false)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <TextField
                placeholder="搜索"
                label="Search"
                onChange={(e): void => {
                  setFilter(e.target.value)
                }}
                helperText={emptyResult ? 'not fond' : null}
                FormHelperTextProps={{
                  error: emptyResult
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <TransitionGroup>
          <Grid container spacing={2}>
            {filterMainPageRouter.map((item, index) => (
              <CSSTransition
                timeout={300}
                key={item.path}
                in={item.in}
                unmountOnExit
                classNames="link-button">
                <Grid item>
                  <RouteLink to={item.path}>
                    <Button variant="outlined">{item.name}</Button>
                  </RouteLink>
                </Grid>
              </CSSTransition>
            ))}
          </Grid>
        </TransitionGroup>
      </Grid>
    </Box>
  )
}

export default Home
