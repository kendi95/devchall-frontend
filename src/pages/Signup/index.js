import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    field: {
        width: '100%',
        marginTop: '1%'
    },
    button: {
        width: '100%',
        marginTop: '5%',
    },
    buttonRedirect: {
        width: '100%',
        marginTop: '2%',
        color: '#000000'
    }
}))

export default props => {

    const classes = useStyles();

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <TextField type="text" label="Nome completo *" variant="outlined" className={classes.field}/>
            <TextField type="email" label="Email *" variant="outlined" className={classes.field}/>
            <TextField type="password" label="Senha *" variant="outlined" className={classes.field}/>
            <Button variant="outlined" type="submit" color="primary" className={classes.button}>Cadastrar-se</Button>
            <Button className={classes.buttonRedirect} href="/signin">Clique aqui para fazer login</Button>
        </form>
    )

}