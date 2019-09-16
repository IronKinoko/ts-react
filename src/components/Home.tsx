import React from 'react'
import { Grid, Card } from '@material-ui/core'

const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((item, inde) => (
        <Grid item key={item} lg={3} xs={6}>
          <Card>{item}</Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
