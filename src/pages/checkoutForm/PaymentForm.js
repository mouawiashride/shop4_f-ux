import React, { useState } from 'react';
import { Typography, Button, Divider, Paper } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import {  useNavigate } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
const stripePromise = loadStripe('pk_test_51JoRqpH5Yub1xj4Npc0dkhy07d46kOYYJr67PaArYNZUHROMd8v9GdqxtnQr25MVWqVPs4I02dWaQ9XRo8mzbbzk00HHUcYOdT');

const PaymentForm = ({ checkoutToken, backStep, shippingData,handleCaptureOrder, onCaptureCheckout,handleEmptyCart }) => {
     
  const ResetCart = async ()=>{
    await    commerce.cart.empty()
}
  const [message,setMessage]=useState('');
        let navigate = useNavigate();
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

     const {error,paymentMethod}= await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    if(error)
      setMessage(error.message);  
    else {
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
      shipping: { name: 'international', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        // Test Gateway is enabled by default, and is used when you submit orders with
        // your sandbox API key
        gateway: 'test_gateway',
        card: {
      number: '4242 4242 4242 4242',
      expiry_month: '01',
      expiry_year: '2023',
      cvc: '123',
      postal_zip_code: '94103',
    },
        
      },
    };    
    handleCaptureOrder(checkoutToken.id, orderData); // there is error in api and the documentaion is bad
    setMessage('success');
    ResetCart();
   setTimeout(()=>{
    navigate('/',{replace:true});
   },2000)
       
  }
 
     
    
      
      

    
  };

  return (
    <>
    {message==='success' ? <div>successfuly operation </div> : (<>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}  >
        <ElementsConsumer  >{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <Paper style={{backgroundColor:'white'}}>
            <CardElement  />
            </Paper>
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements></>)  }
     
    </>
  );
};

export default PaymentForm;
