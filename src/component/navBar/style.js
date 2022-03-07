import { makeStyles, alpha } from '@material-ui/core/styles';
const drawerWidth = 0;
export default makeStyles((theme)=>({
    appBar:{
        boxShadow:'none',
        position:'static',
        borderBottom:'1px solid rgba(0,0,0,0.12)',
        [theme.breakpoints.up('sm')]:{
            width:`calc(100% - ${drawerWidth}px)`,
            marginLeft:drawerWidth
        }
    } ,
    menuButton:{
        marginRight:theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display:'none'
        }
    },
      SearchBox:{
          marginLeft:'auto',
        paddingLeft:'45px',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: 'auto',
      },
      SearchIconWrapper:{
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left:'0px' 
      }
      ,
      InputSearchStyled:{
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: theme.spacing(1, 1, 1, 0),
                    // vertical padding + font size from searchIcon
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                      width: '12ch',
                      '&:focus': {
                        width: '20ch',
                      },
                    },
                  },
                },
                title:
                {
                  color:theme.palette.text.primary
                }
              
      
     
}))