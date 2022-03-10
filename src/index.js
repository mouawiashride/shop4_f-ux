import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import  Themeprovider  from './context/ThemeProvider';
import Container from './flux/Container'

ReactDOM.render(
  <Container/>
  ,
  document.getElementById('root')
);

