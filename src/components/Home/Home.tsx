import React, { useState } from 'react'
import { Grid, Button, TextField, Fade } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Link as RouteLink } from 'react-router-dom'
interface RouteData {
  path: string
  name: string
  in: boolean
}

const mainPageRouter: RouteData[] = [
  { path: '/jsonFormat', name: 'JSON格式化', in: true },
  { path: '/test', name: '测试专用', in: true },
  { path: '/reactHook', name: 'React Hook', in: true },
  { path: './reactSpring', name: 'React Spring', in: true }
]

const Home: React.FC = () => {
  const [filter, setFilter] = useState('')
  const filterMainPageRouter = mainPageRouter.map((item: RouteData) => {
    const newItem = { ...item }
    if (
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.path.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
      newItem.in = true
    else newItem.in = false
    return newItem
  })
  const emptyResult = filterMainPageRouter.every(o => o.in === false)
  return (
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
      {filterMainPageRouter.map((item, index) => (
        <Fade in={item.in} unmountOnExit key={item.path}>
          <Grid item xl={1} lg={2} md={3} sm={6} xs={12}>
            <RouteLink to={item.path}>
              <Button variant="outlined">{item.name}</Button>
            </RouteLink>
          </Grid>
        </Fade>
      ))}
    </Grid>
  )
}

export default Home
