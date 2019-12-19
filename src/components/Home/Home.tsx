import React, { useState } from 'react'
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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

interface ClassifyProps {
  title: string
  route: RouteData[]
}

const classifies: ClassifyProps[] = [
  {
    title: '工具',
    route: [
      { path: '/jsonFormat', name: 'JSON格式化', keyWords: 'json' },
      {
        path: './transcoding',
        name: '转码',
        keyWords: 'unicode base64 url'
      },
      { path: './qrcode', name: '二维码工具', keyWords: 'qrcode' },
      { path: './colorPicker', name: '拾色器', keyWords: 'colorpicker' },
      { path: './barcode', name: '条形码工具', keyWords: 'barcode' }
    ]
  },
  {
    title: '杂物',
    route: [
      { path: '/test', name: '测试专用', keyWords: '' },
      { path: '/reactHook', name: 'React Hook', keyWords: '' },
      { path: './reactSpring', name: 'React Spring', keyWords: '' }
    ]
  }
]

const GridContainer: React.FC = props => {
  return (
    <Grid container spacing={2} style={{ padding: 8 }}>
      {props.children}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiButton-label': {
        whiteSpace: 'nowrap'
      }
    }
  })
)

const Home: React.FC = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState('')

  const filterMainPageRouter: ClassifyProps[] = classifies.map(o => {
    return {
      title: o.title,
      route: o.route.filter(
        (item: RouteData) =>
          item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
          item.path.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
          item.keyWords.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    }
  })
  const emptyResult = filterMainPageRouter.every(o => o.route.length === 0)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            placeholder="Search..."
            onChange={(e): void => {
              setFilter(e.target.value)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            helperText={emptyResult ? 'not fond' : null}
            error={emptyResult}
          />
        </Grid>
        {filterMainPageRouter.map(o => (
          <CSSTransition
            timeout={300}
            key={o.title}
            in={o.route.length !== 0}
            classNames="classify"
            unmountOnExit>
            <Grid item xs={12}>
              <Typography component="h6" variant="h6">
                {o.title}
              </Typography>
              <TransitionGroup component={GridContainer}>
                {o.route.map((item, index) => (
                  <CSSTransition
                    timeout={300}
                    key={item.path}
                    unmountOnExit
                    classNames="link-button">
                    <Grid item>
                      <RouteLink to={item.path}>
                        <Button variant="outlined" className={classes.root}>
                          {item.name}
                        </Button>
                      </RouteLink>
                    </Grid>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </Grid>
          </CSSTransition>
        ))}
      </Grid>
      <Footer />
    </Box>
  )
}

export default Home
