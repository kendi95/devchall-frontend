import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Container, Card, CardContent, Snackbar, InputAdornment } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { green } from '@material-ui/core/colors';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';

import DialogProgress from '../../components/DialogProgress';

import api from '../../services/api';

const useStyles = makeStyles( theme => ({
    alignContent: {
        marginTop: '13%',
        marginBottom: '13%'
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
    },
    margin: {
        margin: theme.spacing(1)
    }
}));

export default function Login({history}) {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const [isSnackOpen, setIsSnackOpen] = useState(false);

    useEffect(() => {
        localStorage.removeItem('token');
    });

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

    const onSubmit = async (event) => {
        event.preventDefault();

        if(email === '' || senha === ''){
            return handleOpenSnackbar('Um ou mais campos estao vazios', 'warning');
        }

        handleOpenDialog('Fazendo login...')

        try{
            const response = await api.post("/signin", {email, senha});
            const { token } = response.data;

            if(token != null){
                setEmail('');
                setSenha('');
                handleClose();
                localStorage.setItem('token', token);
                history.push("/");
            }
        }catch(err){
            handleClose();
            if(err.response.status === 401){
                setEmail('');
                setSenha('');
                handleOpenSnackbar(err.response.data.error, 'error');
            }
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
                            <h2>Login</h2>
                        </div>
                        <CardContent>
                            <form>
                                <TextField 
                                    label="Email *"
                                    type="email" 
                                    variant="standard" 
                                    className={classes.field}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined />
                                            </InputAdornment>
                                        ),
                                    }}/>
                                
                                <TextField 
                                    label="Senha *" 
                                    type="password" 
                                    variant="standard" 
                                    className={classes.field} 
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)} 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined />
                                            </InputAdornment>
                                        ),
                                    }}/>    
                                    
                                <Grid container>
                                    <Grid item xs={6}>
                                    <Button className={classes.buttonRedirect} href="/signup">Criar conta</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" onClick={onSubmit} type="submit" color="primary" className={classes.button}>Entrar</Button>
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