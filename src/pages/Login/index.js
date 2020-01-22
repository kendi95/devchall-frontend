import React, { useEffect, useState } from 'react';
import {useAlert} from 'react-alert';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Container, Card, CardContent } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    alignContent: {
        marginTop: '15%',
        marginBottom: '15%'
    },
    card: {
        backgroundColor: '#F57C00',
        borderRadius: '6px',
        height: '75%',
        width: '100%', 
        alignItems: 'center',
        padding: '2%'
    },
    container: {
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: '#ffffff',
    },
    field: {
        marginTop: '5%',
        width: '100%'
    },
    buttonRedirect: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        
    },
    button: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        color: 'white',
        backgroundColor: green['700'],
        '&:hover': {
            backgroundColor: green['900']
        }
    },
    label: {
        marginTop: '2%',
        textAlign: 'center',
    }
}));

export default function Login({history}) {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        localStorage.removeItem('token');
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await api.post("/signin", {email, senha});
        const { token } = response.data;

        localStorage.setItem('token', token);
        history.push("/");
    }

    return (
        <div>
            <Container fixed className={classes.container}>
                <div className={classes.alignContent}>
                    <Card className={classes.card}>
                        <div className={classes.label}>
                            <h2>Login</h2>
                        </div>
                        <CardContent>
                            <form>
                                <TextField 
                                    label="Email *" 
                                    type="email" 
                                    variant="outlined" 
                                    className={classes.field}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <TextField 
                                    label="Senha *" 
                                    type="password" 
                                    variant="outlined" 
                                    className={classes.field} 
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)} />    
                                    
                                <Grid container>
                                    <Grid item xs={6}>
                                    <Button className={classes.buttonRedirect} href="/signup">Criar conta</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" onClick={onSubmit} type="submit" color="primary" className={classes.button}>Entrar</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </div>
    )

}