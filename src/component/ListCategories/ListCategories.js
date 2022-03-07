import { Grid } from '@material-ui/core';
import React, { Suspense } from 'react'
import Category from '../Category/Category'

import useStyles from './style';
import Loading from '../loading/Loading'
export default function ListCategories({categories}) {
    
       const classes = useStyles(); 
 const RenderCategories = categories.map((category)=>{ return (   
             <Category key={category.id} category={category}  />

      );});

   

   if(!categories)
   return(<Loading/>);
   else
    return (
           <Grid container justifyContent='center' className={classes.f}   >
           
           
            { RenderCategories }

          </Grid>
      
    );
}
