import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


function CardHeader(props) {
    
    const useStyles = makeStyles(() => ({
        root: {
            textAlign: 'center',
            background: props.color
        },
        texto: {
            fontSize: 18,
            color: props.font
        },
        titulo: {
            fontWeiht: 'bold',
            fontSize: 22,
            color: props.font
        }, link: {
            color: '#AED6F1 '
        },
        boton:{
          width: '100%',
          backgroundColor: "#0D0D0D",
          color: "white",
          padding: "10px",
          transition:"0.5s",
          borderRadius: "10%",
          '&:hover': {
            backgroundColor: '#EAF205',
            color: "black"
          }
        }
    }));
    CardHeader.defaultProps = {
        textolink:'',
        value:''
    }
    const classes = useStyles()
    return (
        <Card>
            <CardContent className={classes.root}>
                {props.icono}
                <Typography className={classes.titulo}>
                    {props.titulo}
                </Typography>
                <Typography className={classes.texto}>
                    {props.texto}
                </Typography>
                <Typography className={classes.texto}>
                    {props.cantidad}
                </Typography>
                <Typography className={classes.texto}>
                    {props.precio}
                </Typography>
                <Typography >
                    {(props.textolink!=='')?
                        <Link to={props.link} className={classes.link}>
                            {props.textolink}
                        </Link>
                   : <Typography component={'span'} variant={'body2'}/>
                }

            {(props.value !=='')?
                <button
                        type="submit"
                        variant="contained"
                        color="red"
                        className={classes.boton}
                        onClick={props.link}  value={props.value}> {props.textoBoton}</button>
                        : <Typography component={'span'} variant={'body2'}/>
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}



export default CardHeader;