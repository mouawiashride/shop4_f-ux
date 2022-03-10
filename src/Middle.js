import React from 'react'
import App from './App';

import  Themeprovider  from './context/ThemeProvider';
export default function Middle(props) {
  
  return (
    <Themeprovider>
    <App {...props} />
    </Themeprovider>

   
  )
}
