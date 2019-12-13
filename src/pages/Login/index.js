import React from 'react';
import { Redirect } from 'react-router-dom';
import {useAlert} from 'react-alert';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    title: {
        color: '#ffffff',
    },
    field: {
        marginTop: '2%',
        width: '100%'
    },
    buttonRedirect: {
        width: '100%',
        marginTop: '2%',
        
    },
    button: {
        width: '100%',
        marginTop: '5%',
    }
}))

export default function Logi({history}) {

    const classes = useStyles();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('OK');

        localStorage.setItem('token', "token");
        history.push("/");
    }

    return (
        <form onSubmit={onSubmit}>
            <TextField label="Email *" type="email" variant="outlined" className={classes.field}/>
            <TextField label="Senha *" type="password" variant="outlined" className={classes.field}/>
            <Button variant="outlined" type="submit" color="primary" className={classes.button}>Entrar</Button>
            <Button className={classes.buttonRedirect} href="/signup">Criar conta</Button>
        </form>
    )

}