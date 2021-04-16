import React,{ forwardRef,useState,useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar'
import 'fontsource-roboto'
import '../assets/css/panel.css'
import MaterialTable from 'material-table'
import axios from 'axios'
import {Modal, TextField, Button} from '@material-ui/core'
import interfazProducto from '../interfaces/producto'
//icones
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columnas=[
    {
        title:'Nombre',
        field:'nombre'
    },
    {
        title:'Descripción',
        field:'descripcion'
    },
    {
        title:'Precio',
        field:'precio',
        type:'numeric'
    },
    {
        title:'Cantidad',
        field:'cantidad',
        type:'numeric'
    }
]


const useStyles = makeStyles((theme)=>({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    iconos:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    },
    boton:{
        background: '#82E0AA'
    }
}));
const baseUrl="https://husky-even-troodon.glitch.me/api"
export default function Productos() {
    const [data, setData] = useState([])

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        interfazProducto
    })

    const classes = useStyles()
    //peticiones
    
    const peticionGet=async()=>{
        await axios.get(baseUrl+"/productos")
        .then(response=>{
 
            setData(response.data.Productos)
        })
    }

    const agregarProducto=async()=>{
        await axios.post(baseUrl+"/producto-add",productoSeleccionado)
        .then(response=>{
            setData(data.concat(response.data.Producto))
            abrirCerraModalInsertar()
        })
    }
    
    const editarProducto=async()=>{
        await axios.post(baseUrl+"/producto-edit",productoSeleccionado)
        .then(response=>{
            let updatedList = data.map(item => 
                {
                  if (item._id === productoSeleccionado._id){
                    return {...item, 
                        nombre: productoSeleccionado.nombre,
                        descripcion:productoSeleccionado.descripcion,
                        precio:productoSeleccionado.precio,
                        cantidad:productoSeleccionado.cantidad
                    }; //gets everything that was already in item, and updates "done"
                  }
                  return item; // else return unmodified item 
                });
            
              setData(updatedList); // set state to new object with updated list
            abrirCerraModalEditar()
        })
    }
    const eliminarProducto= async(producto)=>{
        await axios.post(baseUrl+"/producto-delete",producto)
        .then(response=>{
 
            let updatedList= data.filter(item => item._id !== producto._id)
         
            setData(updatedList);
        })
    }
  
    /*------- */
    useEffect(()=>{
        peticionGet();
        
    },[])
    
    const [modalInsertar, setmodalInsertar] = useState(false)
    
    const abrirCerraModalInsertar=()=>{
        setmodalInsertar(!modalInsertar);
    }

    const [modalEditar, setmodalEditar] = useState(false)
    const abrirCerraModalEditar=()=>{
        setmodalEditar(!modalEditar);
    }

    const handleChange=e=>{
        const {name,value}=e.target;
        setProductoSeleccionado(
            prevState=>({
                ...prevState,
                [name]:value
            })
        )
    }
   
    const bodyInsertar=(
        <div className={classes.modal}>
            <h3>Agregar Producto</h3>
            <TextField className={classes.inputMaterial} label="nombre" name="nombre" onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="descripcion" name="descripcion" onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="precio" name="precio" onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="cantidad" name="cantidad" onChange={handleChange}/>
            <br/><br/>
            <div align="right">
                <Button color="primary" onClick={()=>agregarProducto()}>Agregar</Button>
                <Button onClick={()=>abrirCerraModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )
    const bodyEditar=(
        <div className={classes.modal}>
            <h3>Editar Producto</h3>
            <TextField className={classes.inputMaterial} label="nombre" name="nombre" value={productoSeleccionado.nombre} onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="descripcion" name="descripcion" value={productoSeleccionado.descripcion} onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="precio" name="precio" value={productoSeleccionado.precio} onChange={handleChange}/>
            <br/>
            <TextField className={classes.inputMaterial} label="cantidad" name="cantidad" value={productoSeleccionado.cantidad} onChange={handleChange}/>
            <br/><br/>
            <div align="right">
                <Button color="primary" onClick={()=>editarProducto()}>Editar</Button>
                <Button onClick={()=>abrirCerraModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )
    return (
        <div className={classes.root}>

            <Navbar/>
            <br/>
            <Button className={classes.boton} onClick={()=>abrirCerraModalInsertar()}>Agregar Producto</Button>
            <br/><br/>
            <MaterialTable
                icons={tableIcons}
                columns={columnas}
                data={data}
                title={"productos"}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Editar producto',
                        onClick:(event, rowData)=>{


                            setProductoSeleccionado(
                                {_id:rowData._id,
                                 nombre:rowData.nombre,
                                 descripcion:rowData.descripcion,
                                 precio:rowData.precio,
                                 cantidad:rowData.cantidad
                                })
                                abrirCerraModalEditar()
                        }
                    },{
                        icon: DeleteOutline,
                        tooltip: 'Eliminar producto',
                        onClick:(event, rowData)=>{
                            const producto = {_id:rowData._id,
                                nombre:rowData.nombre,
                                descripcion:rowData.descripcion,
                                precio:rowData.precio,
                                cantidad:rowData.cantidad
                               };
                            eliminarProducto(producto);
                        }
                        
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header:{
                        actions:'Acciones'
                    }
                }}
            />
            <Modal
            open={modalInsertar}
            onClose={abrirCerraModalInsertar}>
                {bodyInsertar}
            </Modal>
            <Modal
            open={modalEditar}
            onClose={abrirCerraModalEditar}>
                {bodyEditar}
            </Modal>
        </div>
    );
}
