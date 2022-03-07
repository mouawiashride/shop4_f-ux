
import React ,{useState,memo} from 'react';
import { ExpandLess, ExpandMore, ShoppingCart } from '@material-ui/icons';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Box, Container, Hidden, List, ListItemText, Collapse, ListItemAvatar, Avatar} from '@material-ui/core' 
import { Link,useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './style';
import useTheme  from '../../hooks/useTheme';
import { ListItemButton } from '@mui/material';





const NavBar =({isLoading,categories,total_items})=>{



  const {currentTheme,setDarkMode}=useTheme();   
   const  location = useLocation();
  const classes = useStyles();


  
 
const [anchorElNav, setAnchorElNav] = React.useState(null);
const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget); };
const handleCloseNavMenu = () => { setAnchorElNav(null);};




const [anchorElCategory, setAnchorElCategory] = React.useState(null);
const handleCloseCategoryMenu = () => { setAnchorElCategory(null);};
const handleOpenCategoryMenu = (event) => {   setAnchorElCategory(event.currentTarget); };
 
const [open, setOpen] = useState(false);
const handleClick = () => {setOpen(!open);};




const MenuItemCategoryPc  = categories?.map((category) => (
  <MenuItem  component={Link} role='link' to={`/productCategory/${category.slug}`} divider key={category.name} onClick={handleCloseCategoryMenu}>
    <Typography   color='inherit'  textalign="center">{category.name}</Typography>
  </MenuItem>
))





const ListCategoryMobile  =  categories?.map(category=>{
  return(
    <ListItemButton key={category.name} component={Link} to={`/productCategory/${category.slug}`} sx={{ pl: 3 }}>
    <ListItemAvatar>
       <Avatar  alt={category.name} src={category.assets[0].url} />
    </ListItemAvatar>
    <ListItemText primary={category.name} />
  </ListItemButton>
  )
})






  return(
    <>
   <AppBar color='inherit' className={classes.appBar}> 
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        
         <Hidden smDown>
          <Typography

            variant="h6"
            noWrap
           
            component={Link}
            to='/'
            sx={{  mr: 2, display: {  md: 'flex' } }}
            className={classes.title}
             >
             LOGO
            </Typography>
          </Hidden>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="menu of shop"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
            getContentAnchorEl={null}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                
                display: { xs: 'block', md: 'none' },
              }}
              
            >
            { (categories)&&(<List>
               <ListItemButton onClick={handleClick}>
              <ListItemText primary="Categories" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              {ListCategoryMobile}
              </List>
            </Collapse>
             </List>)
                }
            </Menu>
          </Box>
          <Hidden mdUp>
          <Typography

variant="h6"
noWrap

component={Link}
to='/'
sx={{  mr: 2, display: {  md: 'flex' } }}
className={classes.title}
 >
 LOGO
</Typography>
          </Hidden>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , gap: 4  }}>
         
         
         
          {  (categories)&&(<MenuItem
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appCategories"
              aria-haspopup="true"
              onClick={handleOpenCategoryMenu}
              color="inherit"
            >
              Categories
            </MenuItem>)}
            <Menu
            role='menu'
            getContentAnchorEl={null}
              id="menu-appCategories"
              anchorEl={anchorElCategory}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElCategory)}
              onClose={handleCloseCategoryMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
           {MenuItemCategoryPc}
            </Menu>
           
         
          </Box>
       
        
            {  (location.pathname !== '/order')  && (
               isLoading ? <> </> : ( <div className={classes.button}>
                <IconButton  component = {Link} to='/order' aria-label="Show cart items" color="inherit">
                 <Badge badgeContent = {total_items } color="secondary">
                   <ShoppingCart />
                 </Badge>
                </IconButton>
             </div>)
            )}
        <IconButton aria-label='theme' sx={{ ml: 1 }} onClick={()=>setDarkMode((prev)=>!prev)} color="inherit">
          { currentTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
     </Container>
   </AppBar>

 
</>
  );
}
export default memo(NavBar);