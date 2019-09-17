import React, { useState } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
interface RouteData {
  path: string
  name: string
}

const mainPageRouter: RouteData[] = [
  { path: '/jsonFormat', name: 'JSON格式化' },
  { path: '/test', name: '测试专用' }
]

const Home: React.FC = () => {
  const [filter, setFilter] = useState('')
  const filterMainPageRouter = mainPageRouter.filter((item: RouteData) => {
    return item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  })
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
              helperText={filterMainPageRouter.length === 0 ? 'not fond' : null}
              FormHelperTextProps={{
                error: filterMainPageRouter.length === 0
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {filterMainPageRouter.map((item, inde) => (
        <Grid item key={item.path} lg={1} md={2} xs={6}>
          <Button variant="outlined" href={item.path}>
            {item.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
