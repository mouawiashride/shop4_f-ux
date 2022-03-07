import React,{createContext, useState , useEffect} from 'react'
import { createTheme } from '@material-ui/core';


export const ThemeContext=createContext({});
function Themeprovider({children})  {


 const [darkmode,setDarkMode] = useState(()=>{
    const localtheme = localStorage.getItem('localTheme');
    return localtheme !== null ? JSON.parse(localtheme) : false;
  });
  
  useEffect(()=>{
   console.log('the');
    localStorage.setItem('localTheme',JSON.stringify(darkmode));
  
    },[darkmode]);

    const theme = createTheme({
      palette:{
        type: darkmode ? 'dark' : 'light'
      }
    });

  return (
    <ThemeContext.Provider value={{setDarkMode,theme,darkmode}}>
{children}
    </ThemeContext.Provider>
  )
}
export default Themeprovider;