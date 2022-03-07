import React, { useEffect, useState } from 'react'
import useStyles from './style';
import { AddShoppingCart ,RemoveShoppingCart } from '@material-ui/icons';
import {commerce} from '../../lib/commerce';
import { Link } from 'react-router-dom';
import {Grid,Card,CardMedia,Button ,ButtonGroup, Typography, CardContent} from '@material-ui/core';
import Loading from './../../component/loading/Loading'


export default function Showorders({carts,RetriveCart}) {
    const classes = useStyles();
    
   const hadlerRemoveProduct= async (idProduct)=>
    { 
     await  commerce.cart.remove(idProduct);
     RetriveCart();
    }
    const addItemToCart = async (Product)=>
    { 
    await  commerce.cart.update(Product.id,{'quantity':Product.quantity+1});
    RetriveCart();
    }
    const minusItemfromCart= async (Product)=>
    { 
        await  commerce.cart.update(Product.id,{'quantity':Product.quantity-1});
        RetriveCart();
    }
    const ResetCart = async ()=>{
        await    commerce.cart.empty();
        RetriveCart();
    }

   

   
    
    
    const RenderProduct = carts.line_items?.map((item)=>{  return (
        <Grid className={classes.root}  item key={item.name} xs={10} sm={6} md={4} lg={3}      >
            <Card >
            <CardMedia className={classes.media}   image={item.image.url} title={item.name}  />
                <ButtonGroup fullWidth   >
                    <Button   startIcon={<AddShoppingCart />}  onClick={()=>addItemToCart(item)}></Button>
                    <Button   startIcon={<RemoveShoppingCart />}  onClick={()=>minusItemfromCart(item)}></Button>
                </ButtonGroup>
              <CardContent className={classes.cardContent}>  
            <Typography component='h4' gutterBottom variant='h5' >{item.name} </Typography>
            <Typography component='h5' textColor='success' variant='body1' > quantity is  {item.quantity} </Typography>
            <Typography component='h5' variant='subtitle2' >  unit Price:  {item.price.formatted_with_symbol} </Typography>
            <h3 >  Total Price of This Unit:  {item.line_total.formatted_with_symbol} </h3>
             </CardContent>
            <Button className={classes.buttonWarning} onClick={()=>{hadlerRemoveProduct(item.id)}} >Remove Item</Button>
            </Card>
        </Grid> ); });
    console.log(carts);
    return (
    <> 
       {!carts?.line_items&&(<Loading/>)    } 
       
          { !carts.line_items?.length   ?   <p>please select product</p>  : (<> 
       <Grid  
       container
       justifyContent='center'
       className={classes.f}
         >
       {RenderProduct}
       </Grid>  
        <h3>sub Total: {carts.subtotal.formatted_with_symbol} </h3>
        <Button className={ classes.buttonSuccess } component={Link} to='/checkout' >Check out Now !</Button>
        <Button  className={classes.buttonError} onClick={()=>{ResetCart()}}>Clear Cart</Button>
       </>)    }
       




       {/* {!carts?.line_items  ? (<Loading/>  )   : (<> 
       <Grid  
       container
       justifyContent='center'
       className={classes.f}
         >
       {RenderProduct}
       </Grid>  
        <h3>sub Total: {carts.subtotal.formatted_with_symbol} </h3>
        <Button className={ classes.buttonSuccess } component={Link} to='/checkout' >Check out Now !</Button>
        <Button  className={classes.buttonError} onClick={()=>{ResetCart()}}>Clear Cart</Button>
       </>)  } */}
      
    </>
)
}
