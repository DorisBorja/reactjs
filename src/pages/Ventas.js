import React from 'react'
import Navbar from '../components/Navbar'
import { Grid, TextField, Button, Paper, withStyles } from '@material-ui/core';
import CardHeader from '../components/CardHeader'
import axios from 'axios';


const baseUrl = "https://husky-even-troodon.glitch.me/api"
const useStyles = ((theme) => ({

    table: {
        font: 'arial',
        border: 'collapse',
        width: '100%',
        borderBottom: "3px solid rgb(212, 212, 212)"
    },

    td: {
        border: 1,
        padding: 8,
    },
    th: {
        border: 1,
        padding: 8,
    },
    tr: {
        background: '#dddddd'
    },
    headT: {
        flex: 0.3,
        backgroundColor: "#3f51b5",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        color: "white"
    },
    bodyT: {
        flex: 0.3,
        backgroundColor: "beige",
        borderWidth: 5,
    },
    bottomT: {

    },
    botonPagar: {
        width: '100%',
        backgroundColor: "#27AE60",
        color: "white"
    },
    botonCancelar: {
        width: '100%',
        backgroundColor: "#C0392B",
        color: "white"
    }


}))


class Ventas extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            buscador: "",
            productoSeleccionado: [],
            data: [],
            subtotal: 0,
            iva: 0,
            total: 0

        }
    }


    editarValores = () => {
        let subtotal = 0;
        this.state.productoSeleccionado.map((element, index) => {
            return subtotal = subtotal + element.cantidad * element.precio;

        })
        this.setState({ subtotal: subtotal })
        this.setState({ iva: subtotal * 0.12 })
        this.setState({ total: subtotal * 1.12 })

    }
    cambiarBusqueda = e => {
        const { value } = e.target;
        (

            this.setState({ buscador: value })
        )

        this.setState({ productos: this.state.data })
    }
    componentWillMount() {
        this.productos()
        
    }

    productos=()=>{
        fetch(baseUrl + "/productos")

            .then((response) => {


                return response.json()
            }).then((response) => {

                this.setState({ data: response.Productos })

            }).catch(console.log)
    }

    agregarProducto = (e) => {
        let entro = false;
        let existeCantidad = true;

        this.state.data.filter(item => {
            if (item._id === e.target.value) {
                if (item.cantidad <= 0) {
                    existeCantidad = false
                }
                return item;
            }
            return null;
        })

        if (existeCantidad) {
            let updateProductosSeleccionados = this.state.productoSeleccionado.map(
                producto => {
                    if (producto._id === e.target.value) {
                        entro = true;

                        return {
                            ...producto,
                            cantidad: (producto.cantidad + 1)
                        }; 
                    }
                    return producto;
                }
            )

            let NewData = this.state.data.map(
                item => {
                    if (item._id === e.target.value) {
                        item.cantidad--;
                        return item;
                    }
                    return item;
                })


            if (!entro) {

                let producto
                this.state.data.map(item => {
                    if (item._id === e.target.value) {
                        producto = {
                            _id: item._id,
                            nombre: item.nombre,
                            descripcion: item.descripcion,
                            precio: item.precio,
                            cantidad: 1
                        };
                    }
                })
                let cambios = this.state.productoSeleccionado;
                cambios.push(producto)

                this.setState({
                    productoSeleccionado: cambios
                    , data: NewData
                }, this.editarValores())
            } else {
                this.setState({
                    productoSeleccionado: updateProductosSeleccionados
                    , data: NewData
                }, this.editarValores())
            }

        } else {
            alert("No existe cantidad")
        }
    }
    vender = async() => {
        let detalles = []
        this.state.productoSeleccionado.map(
            producto => detalles.push({ _id: producto._id, cantidad: producto.cantidad })
        )
        let today = new Date();

        let datos = {
            detalles: detalles,
            date: today
        }

        if (detalles.length > 0) {
            await axios.post(baseUrl + "/venta-add", datos)
                .then(response => {
                   if(response.status==200){
                    window.location.reload(false);
                   }
                })
        } else {
            alert("No hay productos agregados aun")
        }

    }

    cancelar = ()=>{
        this.setState({ buscador: "",
        productoSeleccionado: [],
        data: [],
        subtotal: 0,
        iva: 0,
        total: 0})
        this.productos()
    }

    render() {
        const { classes } = this.props;
        return <div>
            <Navbar />
            <Grid direction="row-reverse" container spacing={3}>
                <Grid item xs={12} sm={8} md={5} lg={5} xl={5}>
                    <Paper>
                        <table className={classes.table}>
                            <thead>
                                <tr className={classes.headT} >
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th>Cant.</th>
                                    <th>V. Unit.</th>
                                    <th>V. Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productoSeleccionado.map((element, index) => {

                                    if (element != undefined) {


                                        return <tr key={element._id} className={classes.bodyT}>
                                            <td>{element.nombre}</td>
                                            <td>{element.descripcion}</td>
                                            <td>{element.cantidad}</td>
                                            <td>${Number(element.precio.toFixed(2))}</td>
                                            <td>${Number((element.cantidad * element.precio).toFixed(2))}</td>
                                        </tr>
                                    }
                                })
                                }
                                <tr >
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td className={classes.bottomT}>Subtotal</td>
                                    <td>$ {Number(this.state.subtotal.toFixed(2))} </td>
                                </tr>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td className={classes.bottomT} >IVA</td>
                                    <td>$ {Number(this.state.iva.toFixed(2))}  </td>
                                </tr>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td className={classes.bottomT} >Total</td>
                                    <td>$ {Number(this.state.total.toFixed(2))} </td>
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            type="submit"
                            variant="contained"
                            color="inherit"
                            className={classes.botonPagar}
                            onClick={this.vender}>
                            Pagar
                                </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="inherit"
                            onClick={this.cancelar}
                            className={classes.botonCancelar}>
                            Cancelar
                                </Button>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={7} lg={7} xl={7}>
                    <TextField label="buscador" name="buscador" onChange={this.cambiarBusqueda} />
                    <Grid container spacing={2}>
                        {this.state.data.map((element, index) => {
                            return <Grid key={element._id} item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <CardHeader

                                    titulo={element.nombre}
                                    texto={element.descripcion}
                                    cantidad={'cant. '+element.cantidad}
                                    textolink=''
                                    precio={'$ '+element.precio}
                                    color="#F2A413"
                                    font="white"
                                    textoBoton={"Agregar producto"}
                                    link={this.agregarProducto}
                                    value={element._id}
                                ></CardHeader>
                            </Grid>

                        })
                        }
                    </Grid>
                </Grid>

            </Grid>
        </div>

    }
}
export default withStyles(useStyles)(Ventas);