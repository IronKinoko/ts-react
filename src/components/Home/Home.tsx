import React, { useState } from 'react'
import { Grid, Button, TextField, Box } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Link as RouteLink } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './style.sass'
import Footer from '../Base/Footer'
interface RouteData {
  path: string
  name: string
  keyWords: string
}

const mainPageRouter: RouteData[] = [
  { path: '/jsonFormat', name: 'JSON格式化', keyWords: 'json' },
  { path: '/test', name: '测试专用', keyWords: '' },
  { path: '/reactHook', name: 'React Hook', keyWords: '' },
  { path: './reactSpring', name: 'React Spring', keyWords: '' },
  {
    path: './transcoding',
    name: '转码',
    keyWords: 'unicode base64 url'
  },
  { path: './qrcode', name: '二维码工具', keyWords: 'qrcode' }
]

const GridContainer: React.FC = props => {
  return (
    <Grid container spacing={2} style={{ padding: 8 }}>
      {props.children}
    </Grid>
  )
}

const Home: React.FC = () => {
  const [filter, setFilter] = useState('')
  const filterMainPageRouter = mainPageRouter.filter(
    (item: RouteData) =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.path.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.keyWords.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )
  const emptyResult = filterMainPageRouter.length === 0
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
                error={emptyResult}
              />
            </Grid>
          </Grid>
        </Grid>

        <TransitionGroup component={GridContainer}>
          {filterMainPageRouter.map((item, index) => (
            <CSSTransition
              timeout={300}
              key={item.path}
              unmountOnExit
              classNames="link-button">
              <Grid item>
                <RouteLink to={item.path}>
                  <Button variant="outlined">{item.name}</Button>
                </RouteLink>
              </Grid>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Grid>
      <Footer />
    </Box>
  )
}

export default Home
