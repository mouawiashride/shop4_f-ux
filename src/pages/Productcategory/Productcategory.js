
// import React, {  useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import {Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography} from '@material-ui/core'
// import { useQuery } from 'react-query';
// import { commerce } from '../../lib/commerce';
// import Loading from '../../component/loading/Loading' 
// import useStyles from './styles';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { AddShoppingCart } from '@material-ui/icons';

// const fetchListProducts = async ({queryKey})=>{
 
//     const res =  await commerce.products.list({'category_slug':queryKey[1],'limit':12,'page':queryKey[2],'limit':queryKey[3],'sortBy':queryKey[4],'sortDirection':queryKey[5]});
//     return res;
// };

//  const Productcategory=({handleAddToCart})=> {
//     const classes = useStyles();
//     const {category_slug} = useParams();
//     const [categoryslug,setCategoryslug]= useState('');
  
//       useEffect(()=>{
//        setCategoryslug(category_slug);
//       },[category_slug]);

//     const [ page , setPage ] = useState(1);
//     const [limit,setLimit] = useState(12);
//     const [sortBy,setSortBy] = useState('price');
//     const [sortDirection,setSortDirection]=useState('asc');
 
//          var radios = document.querySelectorAll('input[type=radio][name="FilterDirection"]');
//      radios.forEach(radio => radio.addEventListener('onClick', (e) => {
//          console.log(e);
//      }));

// const {
//     data,
//     isLoading,
//     isError
//      } = useQuery(['products',categoryslug,page,limit,sortBy,sortDirection],fetchListProducts);
//     function changeFilterParams(e)
//     {   setSortBy(e.target.value);   }
//     function changeFilterDirection(e)
//     {  setSortDirection(e.target.value); }



// const RenderProduct = data?.data?.map((product)=>{  return (
//        <Grid  className={classes.root} item  key={product.id} xs={12} sm={6} md={4} lg={3} >
//                     <Card>
//                         <CardMedia className={classes.media} height={{height: 300}}  image={product.image.url} title={product.name}  />
//                         <CardContent className={classes.cardContentContainer}>
//                                 <div className={classes.cardContent}>
//                                         <Typography gutterBottom variant='h5' component='h2'>
//                                         {product.name}
//                                         </Typography>
//                                         <Typography gutterBottom variant='h5' component='h2'>
//                                         ${product.price.formatted}
//                                         </Typography>
//                                 </div>
//                                 <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2"  component="p" />
//                         </CardContent>
//                         <CardActions   className={classes.cardActions}>
//                           <IconButton   aria-label="Add to Cart" onClick={()=>{handleAddToCart(product.id,1)}}>
//                           <AddShoppingCart className={classes.icon}  />
//                           </IconButton >
//                         </CardActions>
//                     </Card>

//         </Grid> ); });

//     if(isLoading)
//     {
//         return(
        
//             <Loading />
//         );
//     }
//     else if (isError)
//     {
//         return('we found error please retry later!!')
//     }
//     else if( data.data == null)
//     return(
//         <div >
//             no products here  
//             Go to <Link style={{color:'blue',textDecoration:'none'}} to='/'> Home </Link> Again 
//         </div>
//     );
//     else return(
//     <div style={{padding:12}}>
    
       
//         <Grid container justifyContent="center" spacing={3} >
//             {RenderProduct}
//         </Grid>
    
//   <Grid container justifyContent="center"  >
//     <Stack   spacing={2}>
//       <Pagination 
      
//       shape="rounded"
//        variant="outlined" 
//        count={data.meta.pagination.total_pages} 
//        showFirstButton
//         showLastButton 
//         defaultPage={1}
//          onChange={(e,value)=>setPage(value)} 
//          />
//      </Stack>
// </Grid>

    
//     </div>
//     )

    

// }
// export default Productcategory;




import React, {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography} from '@material-ui/core'
import { useQuery } from 'react-query';
import { commerce } from '../../lib/commerce';
import Loading from '../../component/loading/Loading' 
import useStyles from './styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AddShoppingCart } from '@material-ui/icons';

const fetchListProducts = async ({queryKey})=>{
 
    const res =  await commerce.products.list({'category_slug':queryKey[1],'limit':12,'page':queryKey[2],'limit':queryKey[3],'sortBy':queryKey[4],'sortDirection':queryKey[5]});
    return res;
};

 const Productcategory=({handleAddToCart})=> {
    const classes = useStyles();
    const {category_slug} = useParams();
    const [categoryslug,setCategoryslug]= useState('');
  
      useEffect(()=>{
       setCategoryslug(category_slug);
      },[category_slug]);

    const [ page , setPage ] = useState(1);
    const [limit,setLimit] = useState(12);
    const [sortBy,setSortBy] = useState('price');
    const [sortDirection,setSortDirection]=useState('asc');
 
         var radios = document.querySelectorAll('input[type=radio][name="FilterDirection"]');
     radios.forEach(radio => radio.addEventListener('onClick', (e) => {
         console.log(e);
     }));

const {
    data,
    isLoading,
    isError
     } = useQuery(['products',categoryslug,page,limit,sortBy,sortDirection],
     fetchListProducts);
    function changeFilterParams(e)
    {   setSortBy(e.target.value);   }
    function changeFilterDirection(e)
    {  setSortDirection(e.target.value); }



const RenderProduct = data?.data?.map((product)=>{  return (
       <Grid  className={classes.root} item  key={product.id} xs={12} sm={6} md={4} lg={3} >
                    <Card>
                        <CardMedia className={classes.media} height={{height: 300}}  image={product.image.url} title={product.name}  />
                        <CardContent className={classes.cardContentContainer}>
                                <div className={classes.cardContent}>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                        {product.name}
                                        </Typography>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                        ${product.price.formatted}
                                        </Typography>
                                </div>
                                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2"  component="p" />
                        </CardContent>
                        <CardActions   className={classes.cardActions}>
                          <IconButton   aria-label="Add to Cart" onClick={()=>{handleAddToCart(product.id,1)}}>
                          <AddShoppingCart className={classes.icon}  />
                          </IconButton >
                        </CardActions>
                    </Card>

        </Grid> ); });

    if(isLoading)
    {
        return(
        
            <Loading />
        );
    }
    else if (isError)
    {
        return('we found error please retry later!!')
    }
    else if( data.data == null)
    return(
        <div >
            no products here  
            Go to <Link style={{color:'blue',textDecoration:'none'}} to='/'> Home </Link> Again 
        </div>
    );
    else return(
    <div style={{padding:12}}>
    
       
        <Grid style={{marginBottom:5}} container justifyContent="center" spacing={3} >
            {RenderProduct}
        </Grid>
    
  <Grid container justifyContent="center"  >
    <Stack     spacing={2}> 
      <Pagination 
    className={classes.pagination}
   
      shape='rounded'
       variant="outlined" 
       count={data.meta.pagination.total_pages} 
       showFirstButton
        showLastButton 
        page={page}
        defaultPage={1}
         onChange={(e,value)=>setPage(value)} 
         />
     </Stack>
</Grid>

    
    </div>
    )

    

}
export default Productcategory;






