import React from 'react'
import React from 'react';
import {Card,Typography, CardContent, CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
export default function cardProducto(props) {
    const useStyles = makeStyles(()=>({
        root:{
            textAlign: 'center',
            background: props.color
        },
        texto:{
            fontSize:18,
            color: props.font
        },
        titulo:{
            fontWeiht: 'bold',
            fontSize:22,
            color: props.font
        },link:{
            color:'#AED6F1 '
        }
    }));

    const classes = useStyles()
    return (
        <Card>
            <CardContent className={classes.root}>
                <Typography className={classes.titulo}>
                {props.titulo}
                </Typography>
                <Typography className={classes.texto}>
                {props.texto}
                </Typography>
                <Typography className={classes.texto}>
                {props.texto}
                </Typography>
                <Typography className={classes.texto}>
                {props.texto}
                </Typography>
            </CardContent>
        </Card>
    );
}

