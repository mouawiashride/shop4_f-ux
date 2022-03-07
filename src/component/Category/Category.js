import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import useStyles from './style';
export default function Category({category}) {  
  const classes = useStyles(); 

    return (
     
       <Grid item  component={Link} xs={10} sm={6} md={4} lg={3} style={{ textDecoration: 'none' , textAlign:'center',margin:'10px 15px'  }}   to={`/productCategory/${category.slug}`}>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={category.assets[0].url} title={category.name} />
          <Typography  sx={{ color: 'info.main' }} component='h4' variant='h5' >{category.name}</Typography>
        </Card>
        </Grid>
     
    )
}
