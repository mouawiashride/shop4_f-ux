import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import { useForm ,FormProvider } from 'react-hook-form';
import FormInput from './Customtextfield';
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';

export default function AddressForm({checkoutToken,test}) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) =>{
      const {countries} = await commerce.services.localeListCountries(checkoutTokenId)
          setShippingCountries(countries);
          setShippingCountry(Object.keys(countries)[0]);
         
    }
    const fetchSubdivisions = async (countryCode)=>{
      
      
        const { subdivisions }= await commerce.services.localeListSubdivisions(countryCode);
       setShippingSubdivisions(subdivisions);
       setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
    const fetchShippingOptions = async (checkoutTokenId, country , stateProvince = null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region:stateProvince})
           setShippingOptions(options);
           setShippingOption(options[0].id);
    }
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[])
    useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    },[shippingCountry]);

    useEffect(()=>{
       if (shippingSubdivision)  fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
    },[shippingSubdivision]);
    
  return <div style={{padding:12}}> 
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
<FormProvider {...methods}>
      <form onSubmit={ methods.handleSubmit((data)=>test({...data ,shippingCountry, shippingSubdivision, shippingOption}))}>
         <Grid container spacing={3}>
      <FormInput defaultValue='sami' name='firstname'  label='first name'  required />
      <FormInput defaultValue='sds' name='lastname'  label='last name'  required />
      <FormInput  defaultValue='usa street 4' required name="address1" label="Address line 1"   />
      <FormInput required defaultValue='shop4u@hotmail.com' name="email" label="Email"   />
      <FormInput required defaultValue='damas' name="city" label="City"  />
      <FormInput required defaultValue='10002'  name="zip" label="Zip / Postal code"  />
         
            <Grid item xs={12} sm={6}>
                    <InputLabel>  Shipping Country  </InputLabel>
                    <Select value={shippingCountry} onChange={(e)=>setShippingCountry(e.target.value)}>
                      {
                          Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name})).map((item)=>(
                          <MenuItem key={item.id} value={item.id}>
                            {item.label}
                          </MenuItem>
                          ))
                      }
                    </Select>
          </Grid>
           <Grid item xs={12} sm={6} >
               <InputLabel>  Shipping Subdivision  </InputLabel>
               <Select value={shippingSubdivision} onChange={(e)=>setShippingSubdivision(e.target.value)}>
                {
                    Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name})).map((item)=>(
                     <MenuItem key={item.id} value={item.id}>
                       {item.label}
                     </MenuItem>
                    ))
                }
               </Select>
             </Grid> 
             <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
           </Grid>
           <div style={{display:'flex' ,justifyContent:'space-between'}}>
               <Button component={Link} variant="outlined" to='/order'>Back To order</Button>
               <Button variant="contained" color="primary" type='submit'>Next</Button>
           </div>
      </form>
    </FormProvider>
  </div>;
}
