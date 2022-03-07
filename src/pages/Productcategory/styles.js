import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root:{ 
        maxWidth:'100%',
        backgroundColor:theme.palette.text.primary

    },
    media:{
        height:0,
        paddingTop:'56.25%',
        backgroundSize:'contain',
        
         
    },
    cardAction:{
        display:'flex',
        justifyContent:'flex-end',
        
       
    },
    icon:{
        color:theme.palette.text.primary,
        
      
    }
    ,
    cardContentContainer:{
        backgroundColor:theme.palette.text.primary,
        color:theme.palette.background.default
    },
    cardContent:{
        display:'flex',
        justifyContent:'space-between',
    },
    pagination:{
       
        backgroundColor:theme.palette.primary.contrastText,
        color:theme.palette.primary.light
    }
   
}));