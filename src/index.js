import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import  Themeprovider  from './context/ThemeProvider';


ReactDOM.render(
  <Themeprovider>
    <App/>
    </Themeprovider>
  ,
  document.getElementById('root')
);

