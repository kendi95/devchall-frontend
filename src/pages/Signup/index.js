import React, { useState } from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { TextField, Button, Grid, Container, Card, CardContent } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import DialogProgress from '../../components/DialogProgress';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    alignContent: {
        marginTop: '12%',
        marginBottom: '12%'
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
    field: {
        width: '100%',
        marginTop: '2%',
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
    buttonRedirect: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        color: '#000000'
    },
    alert: {
        width: '100%'
    },
    label: {
        marginTop: '2%',
        textAlign: 'center',
    }
}))

export default function Signup({ history }) {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpenDialog = (message) => {
        setIsOpen(true);
        setMessage(message);
    }

    async function onSubmit(event) {
        event.preventDefault();

        handleOpenDialog("Carregando...");

        const response = await api.post('/signup', {nome: nome, email: email, senha: senha});
        const { token } = response.data;

        if(token != null){
            handleClose();
            localStorage.setItem('token', token);
            history.push("/");
        }

    }

    return (
        <div>
            <Container fixed className={classes.container}>
                <div className={classes.alignContent}>
                    <Card className={classes.card}>
                        <div className={classes.label}>
                            <h2>Cadastrar</h2>
                        </div>
                        <CardContent>
                        <form>
                            <TextField type="text" label="Nome completo *" variant="outlined" className={classes.field} value={nome} onChange={event => setNome(event.target.value)} />
                            <TextField type="email" label="Email *" variant="outlined" className={classes.field} value={email} onChange={event => setEmail(event.target.value)}/>
                            <TextField type="password" label="Senha *" variant="outlined" className={classes.field} value={senha} onChange={event => setSenha(event.target.value)}/>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button className={classes.buttonRedirect} href="/signin">Clique aqui para fazer login</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" type="submit" color="primary" className={classes.button} onClick={onSubmit}>Cadastrar-se</Button>
                                </Grid>
                            </Grid>
                            <DialogProgress open={isOpen} onClose={handleClose} text={message}/>
                        </form>  
                        </CardContent>
                    </Card>
                </div>
            </Container>

        </div>
          
    )

}