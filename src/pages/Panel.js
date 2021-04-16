import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar'
import 'fontsource-roboto'
import '../assets/css/panel.css'
//iconos
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CardHeader from '../components/CardHeader'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import axios from 'axios';
import LineChart from '../components/chars/LineChart';
const baseUrl="https://husky-even-troodon.glitch.me/api"
const useStyles = makeStyles(()=>({
    root:{
        flexGrow: 1
    },iconos:{
        color:'white'
    }
}));


function Panel() {
    const classes = useStyles()
    
    const [totalProductos, setTotalProductos] = useState([])
    const [totalProductosBajoStock, setTotalProductosBajoStock] = useState([])
    const [totalVentas, setTotalVentas] = useState([])

useEffect(()=>{
    peticionGetTotalProductos();
    peticionGetTotalProductosBajoStock();
    peticionGetTotalVentas();
    
},[])
const peticionGetTotalProductos=async()=>{
    await axios.get(baseUrl+"/productosTotal")
    .then(response=>{
      
        setTotalProductos(response.data.total)
    })
}
const peticionGetTotalProductosBajoStock=async()=>{
    await axios.get(baseUrl+"/productosBajoStock")
    .then(response=>{

        setTotalProductosBajoStock(response.data.total)
    })
}
const peticionGetTotalVentas=async()=>{
    await axios.get(baseUrl+"/ventasTotal")
    .then(response=>{
   
        setTotalVentas(response.data.total)
    })
}
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navbar/>
                </Grid>


                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                   <CardHeader
                   icono={<AddShoppingCartIcon className={classes.iconos}/>}
                   titulo="Productos de bajo stock"
                   texto={'Total de productos '+totalProductosBajoStock}
                   color="#C0392B"
                   font="white"
                   value=''
                   link='/productos'
                   textolink="Gestionar productos"
                   ></CardHeader>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                   <CardHeader
                   icono={<ShoppingCartIcon className={classes.iconos}/>}
                   titulo="Productos"
                   texto={'Total de productos '+totalProductos}
                   color="#2980B9"
                   font="white"
                   value=''
                   link='/productos'
                   textolink="Gestionar productos"
                   ></CardHeader>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                   <CardHeader
                   icono={<AttachMoneyIcon className={classes.iconos}/>}
                   titulo="Ventas"
                   texto={'Total de ventas '+totalVentas}
                   color="#27AE60 "
                   font="white"
                   value=''
                   link='/ventas'
                   textolink="Gestionar ventas"
                   ></CardHeader>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <LineChart></LineChart>
                </Grid>
            </Grid>
        </div>
    );
}

export default Panel;