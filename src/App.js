

import {  Paper, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import useTheme from './hooks/useTheme';
import Core from "./component/core/Core";

     
const  App  =(props) => {

  const {theme} = useTheme();



  return (
  
     <ThemeProvider theme={theme}>
      <Paper style={{minHeight:'100vh' , backgroundColor:theme.palette.background.default}}>
        <Core  {...props} /> 
      </Paper>
    </ThemeProvider>
 
  );
}
export const dataoftheme = React.createContext();
export default App;
