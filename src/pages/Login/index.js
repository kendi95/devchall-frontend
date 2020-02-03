import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { TextField, Button, Grid, Container, Card, CardContent, InputAdornment, Typography } from '@material-ui/core';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';

import DialogProgress from '../../components/DialogProgress';
import SnackBar from '../../components/SnackBar';
import styles from './styles';

import api from '../../services/api';

export default function Login({history}) {

    const classes = styles();

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
            return handleOpenSnackbar('Um ou mais campos estão vazios', 'warning');
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

    

    return (
        <div>
            <Container fixed className={classes.container}>
                <SnackBar isSnackOpen={isSnackOpen} handleSnackClose={handleSnackClose} severity={severity} message={message}/>
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

                                    <div className={classes.recovery}>
                                        <Link to="/recovery" className={classes.link}>
                                            <Typography component="h4" className={classes.linkTypo}>Esqueceu a senha?</Typography>
                                        </Link>
                                    </div>
                                    
                                
                                    
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