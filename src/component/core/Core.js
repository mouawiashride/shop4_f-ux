import React, {  useEffect, useState,Suspense, lazy } from 'react'
import { BrowserRouter as Router ,Routes, Route, Navigate } from "react-router-dom";
import MainView from '../../pages/mainView/MainView';


import Navbar from '../navBar/NavBar';
import Showorders from '../../pages/Orders/Showorders';
import { commerce } from '../../lib/commerce';

import Productcategory from '../../pages/Productcategory/Productcategory';
import { QueryClientProvider,QueryClient,  } from 'react-query';
import Checkout from '../../pages/checkoutForm/checkout/Checkout';




const queryClient = new QueryClient();
 


 const  Core =(props)=> {
   console.log(props);

    const [products, setProducts] = useState([]);
    
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
    
        setProducts(data);
      };
      
      const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
      };
    
       
    
    
      const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };
      const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    
          setOrder(incomingOrder);
    
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
      };
      
     

      useEffect(()=>{
        fetchProducts();
        fetchCart();
      props.fetchCategories();
      props.fetchCart();
      },[])
 
   

    
    
    
    
    
    return (
        <QueryClientProvider   client={queryClient}>
        <Router>
         
        <Navbar 
         cart={props.cart} 
         categories={props.categories}

        />
       
        <Routes>
        <Route
         path='/'  element={
         <MainView 
        categories={props.categories} 
        />}
         />
         <Route 
         path='/productcategory/:category_slug'

         element={ 
           
         <Productcategory
         products={products}
         handleAddToCart={props.handleAddToCart}
         />
     
        } 
        />
        <Route
       path='order' 
        element={<Showorders 
          RetriveCart={props.RetriveCart} 
          handleAddToCart={props.handleAddToCart}
          handleMinusFromCart={props.handleMinusFromCart}
          handleRemoveFromCart={props.handleRemoveFromCart}
          handleEmptyCart={props.handleEmptyCart}
          cart={props.cart}
              />}
         />
         <Route 
         path='checkout' 
         element={<Checkout
           cart={props.cart}
            order={order}
             error={errorMessage} 
             onCaptureCheckout={handleCaptureCheckout} 
             handleGenerateToken={props.handleGenerateToken}
             handleCaptureOrder={props.handleCaptureOrder}
         />}
         />
       
        <Route  path='*'   element={<Navigate to='/'/>}  />
        </Routes>
        
        </Router>
        </QueryClientProvider>
    )}

export default Core ;


