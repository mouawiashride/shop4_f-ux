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
 


 const  Core =()=> {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
    
        setProducts(data);
      };
      const fetchCategories = async () => {
        const { data } = await commerce.categories.list();
    
        setCategories(data);
      };
      const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
      };
      const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
    
        setCart(item.cart);
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
      
      const RetriveCart= async()=>{
            const data = await  commerce.cart.retrieve();
            setCart(data);
        }

      useEffect(()=>{
        fetchProducts();
        fetchCart();
      
        fetchCategories();
      },[])
 
   

    
    
    
    
    
    return (
        <QueryClientProvider   client={queryClient}>
        <Router>
         
        <Navbar 
         total_items={cart.total_items} 
         categories={categories}
        />
       
        <Routes>
        <Route
         path='/'  element={
         <MainView 
        categories={categories} 
        />}
         />
         <Route 
         path='/productcategory/:category_slug'

         element={ 
           
         <Productcategory
         products={products}
         handleAddToCart={handleAddToCart}
         />
     
        } 
        />
        <Route
       path='order' 
        element={<Showorders RetriveCart={RetriveCart}  carts={cart}/>}
         />
         <Route 
         path='checkout' 
         element={<Checkout cart={cart} order={order} error={errorMessage} onCaptureCheckout={handleCaptureCheckout} 
  
         />}
         />
       
        <Route  path='*'   element={<Navigate to='/'/>}  />
        </Routes>
        
        </Router>
        </QueryClientProvider>
    )}

export default Core ;


