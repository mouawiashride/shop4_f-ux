
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root:{
        maxWidth:'100%',
        borderRadius:'0px 40px 80px 0px  ',
        overflow:'Hidden',
        border:'0.001px solid',
        borderColor: theme.palette.primary.main,
        margin:'5px' 
        
        
    },
    media:{
        height:0,
        paddingTop:'56.25%',
        backgroundSize:'contain',
    
    },
    cardAction:{
        display:'flex',
        justifyContent:'flex-end'
    },
    cardContent:{
      backgroundColor:theme.palette.background.default
    },
    buttonWarning:{
        background: '#ed6c02',
        color:'white',
        '&:hover' : {
            background: '#ff9800',
           
        }
    },
    buttonSuccess:{
        background: '#2e7d32',
        color:'white',
        '&:hover' : {
            background: '#4caf50',  
        },
    },
    buttonError:{
        background: '#d32f2f',
        color:'white',
        '&:hover' : {
            background: '#ef5350',  
        },
    },
    
 f : {
    backgroundColor:theme.palette.background.default
  }
   
}));