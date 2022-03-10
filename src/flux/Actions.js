
import FluxActionTypes from './FluxActionTypes';
import {commerce} from '../lib/commerce'
import FluxDispatcher from './FluxDispatcher';


const Actions ={

GitCategories : (categories)=>({
    type:FluxActionTypes.GIT_CATEGORIES,
    payload:categories
    })
    ,
fetchCategories : async ()=>{
    FluxDispatcher.dispatch({type:'CATEGORIES_LOADING'});
  try { 
       const {data} =   await  commerce.categories.list(); 
      FluxDispatcher.dispatch({type:'GIT_CATEGORIES',payload:data})
}
catch(error)
{   
     FluxDispatcher.dispatch({type:'CATEGORIES_FAILED',payload:error}) 
}
}
,
categoriesLoading :()=>({
    type:FluxActionTypes.CATEGORIES_LOADING
    })
,
 categoriesFailed :(errmess)=>({
    type:FluxActionTypes.CATEGORIES_FAILED,
    payload:errmess
})
, 
 promosLoading :()=>({
type:FluxActionTypes.PROMOS_LOADING
})

, promosFailed :(errmess)=>({
    type:FluxActionTypes.PROMOS_FAILED,
    payload:errmess
})

, addPromos : (promos)=>({
type:FluxActionTypes.ADD_PROMOS,
payload:promos
}),




 fetchCart:async()=>{
  FluxDispatcher.dispatch({type:'CART_LOADING'});
   try 
   {
    const data = await  commerce.cart.retrieve();
    FluxDispatcher.dispatch({type:'RETRIVE_CART',payload:data}) 
}
 catch(error) {
    FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message}) 
    }
  
}
,
RetriveCart:(cart)=>({
    type:FluxActionTypes.RETRIVE_CART,
    payload:cart
})
,
 cartLoading :()=>({
type:FluxActionTypes.CART_LOADING
}),

 cartFailed :(errmess)=>({
  type:FluxActionTypes.CART_FAILED,
  payload:errmess
})
,
handleAddToCart: async (productId,quantity)=>{
   
    try {
        const {cart} = await commerce.cart.add(productId, quantity);
        FluxDispatcher.dispatch({type:'ADD_TO_CART',payload:cart});
    }
    catch(error)
    {
        FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message});
    }
}
,

handleMinusFromCart:async (product)=>{
   
    try {
        const {cart} = await  commerce.cart.update(product.id,{'quantity':product.quantity-1});
        FluxDispatcher.dispatch({type:'MINUS_FROM_CART',payload:cart});
    }
    catch(error)
    {
        FluxDispatcher.dispatch({type:'CART_FAILED',payload:error});
    }
}
,
minusFromCart : (cart)=>({
    type:FluxActionTypes.MINUS_FROM_CART,
    payload:cart
    })

,
handleRemoveFromCart:async (productId)=>{
   
    try {
        const {cart} = await  commerce.cart.remove(productId);
        FluxDispatcher.dispatch({type:'REMOVE_FROM_CART',payload:cart});
    }
    catch(error)
    {
        FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message});
    }
}
,
removeFromCart : (cart)=>({
    type:FluxActionTypes.REMOVE_FROM_CART,
    payload:cart
    })

,
handleEmptyCart:async ()=>{
    
    try {
        const {cart} = await  commerce.cart.empty();
        FluxDispatcher.dispatch({type:'EMPTY_CART',payload:cart});
    }
    catch(error)
    {
        FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message});
    }    
}
,
emptyCart:  (cart)=>(
 {
        type:FluxActionTypes.EMPTY_CART,
        payload:cart
    }
)
,
 addToCart : (cart)=>({
type:FluxActionTypes.ADD_TO_CART,
payload:cart
})
,
handleGenerateToken: async(cartId)=>{
    try {
        const token = await commerce.checkout.generateTokenFrom('cart', commerce.cart.id());
        FluxDispatcher.dispatch({type:'GENERATE_TOKEN',payload:token});
    }
    catch(error)
    {
        FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message});
    }    
},
generateToken:(token)=>({
    type:FluxActionTypes.GENERATE_TOKEN,
    payload:token
}),
handleCaptureOrder: async(checkoutTokenId,order)=>{
  try {
   await commerce.checkout.capture( checkoutTokenId, order);
  }
  catch (error)
  {
    FluxDispatcher.dispatch({type:'CART_FAILED',payload:error.message});
  }
}
}
export default Actions;