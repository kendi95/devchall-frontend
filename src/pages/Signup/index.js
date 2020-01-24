import React, { useState } from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { TextField, Button, Grid, Container, Card, CardContent, Snackbar, InputAdornment } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { green } from '@material-ui/core/colors';
import LockOutlined from '@material-ui/icons/LockOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import EmailOutlined from '@material-ui/icons/EmailOutlined';

import DialogProgress from '../../components/DialogProgress';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    alignContent: {
        marginTop: '10%',
        marginBottom: '10%'
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
    const [severity, setSeverity] = useState('');

    const [isSnackOpen, setIsSnackOpen] = useState(false);
    
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleSnackClose = () => {
        setIsSnackOpen(false);
    }

    const handleOpenDialog = (message) => {
        setIsOpen(true);
        setMessage(message);
    }

    const handleOpenSnackbar = (message, severity) => {
        setIsSnackOpen(true);
        setMessage(message);
        setSeverity(severity);
    }

    async function onSubmit(event) {
        event.preventDefault();

        if(nome === '' || email === '' || senha === ''){
            return handleOpenSnackbar('Um ou mais campos estao vazios', 'warning');
        }

        handleOpenDialog("Carregando...");

        try{
            const response = await api.post('/signup', {nome: nome, email: email, senha: senha});
            const { token } = response.data;

            if(token != null){
                setNome('');
                setEmail('');
                setSenha('');
                handleClose();
                localStorage.setItem('token', token);
                history.push("/");
            }
        }catch(err){
            setNome('');
            setEmail('');
            setSenha('');
            handleOpenSnackbar(err.response.textStatus, 'error');
        }

    }

    const Alert = (props) => {
        return (
            <MuiAlert elevation={6} variant="filled" {...props }/>
        )
    }

    return (
        <div>
            <Container fixed className={classes.container}>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} 
                    open={isSnackOpen} onClose={handleSnackClose} autoHideDuration={3000}>
                    <Alert onClose={handleSnackClose} severity={severity}>{message}</Alert>
                </Snackbar>
                <div className={classes.alignContent}>
                    <Card className={classes.card}>
                        <div className={classes.label}>
                            <h2>Cadastrar</h2>
                        </div>
                        <CardContent>
                        <form>
                            <TextField 
                                type="text" 
                                label="Nome completo *" 
                                variant="standard" 
                                className={classes.field} 
                                value={nome} 
                                onChange={event => setNome(event.target.value)} 
                                InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlined />
                                            </InputAdornment>
                                        )
                                    }}/>
                            <TextField 
                                type="email" 
                                label="Email *" 
                                variant="standard" 
                                className={classes.field} 
                                value={email} 
                                onChange={event => setEmail(event.target.value)}
                                InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined />
                                            </InputAdornment>
                                        ),
                                    }}/>
                            <TextField 
                                type="password" 
                                label="Senha *" 
                                variant="standard" 
                                className={classes.field} 
                                value={senha} 
                                onChange={event => setSenha(event.target.value)}
                                InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined />
                                            </InputAdornment>
                                        ),
                                    }}/> 
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