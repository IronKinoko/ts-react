import React from 'react'
import ChainAnimation from './ChainAnimation'
import { Grid, Box, Card, CardHeader, CardContent } from '@material-ui/core'

const ReactSpring: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Card>
            <CardHeader title="ChainAnimation" />
            <CardContent>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
                borderRadius="7px"
                bgcolor="#444">
                <ChainAnimation />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ReactSpring
