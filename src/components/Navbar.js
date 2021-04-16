import React from 'react';
import {makeStyles,useTheme } from '@material-ui/core/styles'
import {AppBar,Toolbar,IconButton,Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../assets/img/branding.jpg';


import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import ListAltIcon from '@material-ui/icons/ListAlt'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles(()=>({
    root:{
        flexGrow: 1
    },
    menuButton:{
        marginRight: '16px'
    },
    title:{
        flexGrow:1
    },
    imagen:{
        borderRadius:'50%'
    }
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);


    //acciones para poder abrir y cerrar la barra lateral
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

  

      const cerrarSesion=()=>{
        localStorage.clear();
        window.location.reload(false);
      }
    
      
    return (
        <div className={classes.root}>
             <AppBar
            position="static"
          >
                <Toolbar>
                    <IconButton 
                    edge="start" className={classes.menuButton} color="inherit"
                    onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Control de inventario
                    </Typography>
                    <IconButton color="inherit">
                            <img src={logo} width="40px" height="40px" alt="icono usuario" className={classes.imagen}/>
                        </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
            variant="persistent"
            anchor="left"
            open={open}
          >
            <div >
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
              {text:'Panel',url:'/'},
              {text:'Productos',url:'/productos'},
              {text:'Ventas',url:'/ventas'},
              {text:'Reporte de ventas',url:'/reportes'},
              {text:'Cerrar Sesión', onclick:''}
            ].map((item, index) => (
              (typeof item.onclick !== 'undefined')?
              <ListItem component="a" onClick={cerrarSesion} button key={item.text}>
                     <ListItemIcon><ExitToAppIcon /></ListItemIcon>
         <ListItemText primary={item.text} /> </ListItem>
                
                :<ListItem component="a" href={item.url} button key={item.text}>
                  <ListItemIcon>{
                  index === 0 ? 
                  <HomeIcon/>:
                  index === 1 ? 
                  < ListAltIcon/> : 
                  index === 2 ? 
                  <MonetizationOnIcon />:
                  index === 3 ? 
                  <TrendingUpIcon /> : 
                  index === 4 ? 
                  <TrendingUpIcon /> : 
                  index
                  }</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
    );
}

export default Navbar;