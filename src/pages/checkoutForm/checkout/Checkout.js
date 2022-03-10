import { Button, CircularProgress, Divider, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './style';

export default function Checkout( {order,handleGenerateToken,handleCaptureOrder, error,cart}) {
  
  
    const classes = useStyles();
    let navigate = useNavigate();
  
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const steps = ['Shipping address', 'Payment details'];
    const test = (data)=>{
      console.log(data);
        setShippingData(data);
        nextStep();
    }
    useEffect(()=>{
        if(cart.cart.total_items)
         handleGenerateToken(cart.cart.id);
        else 
           navigate('/');
},[cart.cart])

    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));

    const Form = () => (activeStep === 0 
        ? <AddressForm checkoutToken={cart.checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
        :   <PaymentForm  checkoutToken={cart.checkoutToken} nextStep={nextStep} backStep={backStep} setShippingData={setShippingData} shippingData={shippingData} handleCaptureOrder={handleCaptureOrder}/>
        )
 
 
 return <>

    
      <h2 variant="h4" align="center">Checkout</h2>
      <Stepper activeStep={activeStep}>
          {steps.map((label)=>(
                    <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                    </Step>
          ))}
      </Stepper>
      {activeStep === steps.length ? <Confirmation /> : cart.checkoutToken && <Form /> }
  </>;
}
