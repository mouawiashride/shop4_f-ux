import React from 'react'
import { useFormContext,Controller } from 'react-hook-form';
import { Grid, TextField } from '@material-ui/core';
export default function FormInput({name,label,required}) {
    const {control,setValue } = useFormContext();
   
    const isError = false;
  return (
    <Grid item xs={12} sm={6}>
            <Controller 
             name={name}
            control={control}
            
            render = {({ field})=> (
              <TextField
              onChange={(e)=>{setValue(name,e.target.value) }}
              label={label}
              fullWidth
              error={isError}
             
            
            
              />
          )}
            />
    </Grid>
  )
}
