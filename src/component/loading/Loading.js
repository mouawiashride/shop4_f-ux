import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react'

export default function Loading
() {
   
  return (
 <Grid  justifyContent='center' container  >
<CircularProgress item sx={{ color: 'info.main' }} p={3} />
</Grid>
  )
}
