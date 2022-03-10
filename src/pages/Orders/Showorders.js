import useStyles from './style';
import { AddShoppingCart ,RemoveShoppingCart } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import {Grid,Card,CardMedia,Button ,ButtonGroup, Typography, CardContent} from '@material-ui/core';
import Loading from './../../component/loading/Loading'


export default function Showorders({cart,handleAddToCart,handleMinusFromCart,handleRemoveFromCart,handleEmptyCart}) {
    const classes = useStyles();
    
 
   

    
    
    const RenderProduct = cart?.cart?.line_items?.map((item)=>{  return (
        <Grid className={classes.root}  item key={item.name} xs={10} sm={6} md={4} lg={3}      >
            <Card >
            <CardMedia className={classes.media}   image={item.image.url} title={item.name}  />
                <ButtonGroup fullWidth   >
                    <Button   startIcon={<AddShoppingCart />}  onClick={()=>{handleAddToCart(item.product_id,1)}}></Button>
                    <Button   startIcon={<RemoveShoppingCart />}  onClick={()=>handleMinusFromCart(item)}></Button>
                </ButtonGroup>
              <CardContent className={classes.cardContent}>  
            <Typography component='h4' gutterBottom variant='h5' >{item.name} </Typography>
            <Typography component='h5' textColor='success' variant='body1' > quantity is  {item.quantity} </Typography>
            <Typography component='h5' variant='subtitle2' >  unit Price:  {item.price.formatted_with_symbol} </Typography>
            <h3 >  Total Price of This Unit:  {item.line_total.formatted_with_symbol} </h3>
             </CardContent>
            <Button className={classes.buttonWarning} onClick={()=>{handleRemoveFromCart(item.id)}} >Remove Item</Button>
            </Card>
        </Grid> ); });
    console.log(cart);
  if(cart.isLoading)
   return <Loading/>
   else if(cart.errMess)
    return <div>cart.errMess</div>
    else{console.log(cart);
        if(cart.cart.total_items === 0)
        return <div>please select any product and come again</div>
        else return (<>
            <Grid  
                   container
                   justifyContent='center'
                   className={classes.f}
                     >
                   {RenderProduct}
                   </Grid>  
                    <h3>sub Total: {cart.cart.subtotal.formatted_with_symbol} </h3>
                    <Button className={ classes.buttonSuccess } component={Link} to='/checkout' >Check out Now !</Button>
                    <Button  className={classes.buttonError} onClick={()=>{handleEmptyCart()}}>Clear Cart</Button>
                    </>)
    }
}
